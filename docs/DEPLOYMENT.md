# Arora Tech Solutions - Production Deployment Guide
**Target Subdomain:** `hire.aroratechsolutions.com`  
**Main Corporate Site:** `aroratechsolutions.com` (WordPress, untouched)

---

## 1. Architecture Overview
This application is an independent, custom-coded PHP 8.x + MySQL lead-generation platform. It runs on a dedicated subdomain (`hire.aroratechsolutions.com`) with its own document root, database, and SMTP mailer. The main WordPress site (`aroratechsolutions.com`) remains completely separate and untouched.

---

## 2. Server Requirements
- **PHP Version:** PHP 8.1, 8.2, or 8.3+
- **Extensions:** `pdo`, `pdo_mysql`, `mbstring`, `openssl`, `json`, `filter`, `session`
- **Web Server:** Apache 2.4+ (with `mod_rewrite`, `mod_headers`, `mod_deflate`, `mod_expires`) OR Nginx 1.20+
- **Database:** MySQL 8.0+ or MariaDB 10.5+ (Collation: `utf8mb4_unicode_ci`)
- **Hosting Environment:** Compatible with standard cPanel shared hosting, Cloudways, DigitalOcean LEMP/LAMP, or AWS EC2.

---

## 3. Deployment Steps on cPanel Shared Hosting

### Step 1: Create Subdomain & Document Root
1. Log into your cPanel account.
2. Navigate to **Domains > Subdomains**.
3. Create subdomain: `hire`.
4. Domain: `aroratechsolutions.com`.
5. Set **Document Root** to: `public_html/hire/public` (or `hire.aroratechsolutions.com/public`).
   > *Note:* Setting the document root directly to the `/public` directory ensures that `/config`, `/includes`, `/database`, and `/docs` are outside the public web root. If your cPanel host forces the document root to the parent directory, the included root `.htaccess` will automatically shield sensitive folders and route requests to `/public`.

### Step 2: MySQL Database Setup
1. Go to **cPanel > MySQL Database Wizard**.
2. Create database: `arora_hire_db`.
3. Create user: `arora_db_user` with a strong password.
4. Grant **ALL PRIVILEGES** to the user on this database.
5. Open **phpMyAdmin**, select `arora_hire_db`, go to the **Import** tab, and import `database/schema.sql`.

### Step 3: Upload Codebase & Permissions
1. Upload the project files via SFTP or cPanel File Manager.
2. Ensure file permissions:
   - Directories: `755`
   - Files: `644`
   - Ensure the server has write permissions for `logs/` (e.g. `755` or `775`).

### Step 4: Configure Environment (`.env`)
1. In the project root, copy `config/.env.example` to `.env`:
   ```bash
   cp config/.env.example .env
   ```
2. Update the credentials in `.env`:
   ```ini
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://hire.aroratechsolutions.com
   APP_KEY=generate_a_random_64_character_hex_key_here

   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=arora_hire_db
   DB_USER=arora_db_user
   DB_PASS=your_strong_password_here
   DB_CHARSET=utf8mb4

   SMTP_ENABLED=true
   SMTP_HOST=mail.hire.aroratechsolutions.com
   SMTP_PORT=587
   SMTP_SECURE=tls
   SMTP_AUTH=true
   SMTP_USER=hire@hire.aroratechsolutions.com
   SMTP_PASS=your_smtp_password_here
   SMTP_FROM_EMAIL=hire@hire.aroratechsolutions.com
   SMTP_FROM_NAME="Arora Tech Solutions"
   ADMIN_NOTIFICATION_EMAIL=hire@aroratechsolutions.com
   ```

### Step 5: SSL / TLS Certificate
1. Go to **cPanel > SSL/TLS Status**.
2. Run **AutoSSL** on `hire.aroratechsolutions.com` to provision a free Let's Encrypt / Sectigo certificate.
3. Test HTTPS by visiting `https://hire.aroratechsolutions.com`. The `.htaccess` will enforce HTTPS redirection automatically.

---

## 4. Nginx Server Block Configuration (Alternative to Apache)

If deploying on a VPS (DigitalOcean, AWS, Linode) running Nginx:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name hire.aroratechsolutions.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name hire.aroratechsolutions.com;

    root /var/www/hire-platform/public;
    index index.php;

    ssl_certificate /etc/letsencrypt/live/hire.aroratechsolutions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hire.aroratechsolutions.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Enforce trailing slash on directories
    rewrite ^([^.\?]*[^/])$ $1/ permanent;

    # Clean URL Rewrites
    location = / {
        try_files /index.php =404;
    }

    location = /contact/ {
        try_files /contact.php =404;
    }

    location ~ ^/hire/([a-zA-Z0-9\-]+)/$ {
        try_files /hire/$1.php =404;
    }

    location = /sitemap.xml {
        try_files /sitemap.xml.php =404;
    }

    # Static Assets Caching
    location ~* \.(css|js|svg|png|jpg|jpeg|webp|ico|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Deny access to protected files
    location ~ /\.(ht|git|env) {
        deny all;
    }

    # Deny direct access to non-public source folders
    location ~ ^/(config|includes|database|docs|logs)/ {
        deny all;
    }

    # PHP FastCGI execution
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
        fastcgi_intercept_errors on;
    }
}
```

---

## 5. Automated Daily MySQL Backup (Cron Job)

To ensure lead data is safely preserved, configure a daily cron backup:

```bash
# In cPanel > Cron Jobs (Run daily at 2:00 AM):
0 2 * * * mysqldump -u arora_db_user -p'your_strong_password' arora_hire_db | gzip > /home/username/backups/hire_db_$(date +\%F).sql.gz
```

To purge backups older than 30 days:
```bash
0 3 * * * find /home/username/backups/ -name "hire_db_*.sql.gz" -mtime +30 -delete
```

---

## 6. Pre-Launch Verification Checklist
See [VERIFY-CHECKLIST.md](file:///d:/Projects/project/hiring-arora/docs/VERIFY-CHECKLIST.md) for full acceptance testing.
