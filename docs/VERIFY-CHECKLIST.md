# Arora Tech Solutions - Pre-Launch Verification & Acceptance Checklist
**Domain:** `hire.aroratechsolutions.com`

---

## Part 1: List of All Items Requiring Client Verification (`<!-- VERIFY -->`)

Every unconfirmed business parameter, SLA, and external asset placeholder has been tagged with `<!-- VERIFY -->` in the codebase. Verify or update the following before public production traffic:

| # | Item to Verify | File Location | Default Setting | Action Required |
|---|---|---|---|---|
| 1 | **Legal Entity Name** | `config/brand.php` | `Arora Tech Solutions Pvt. Ltd.` | Confirm exact registered business name for footer copyright and terms. |
| 2 | **Brand Logo SVG / Path** | `config/brand.php`, `assets/images/logo.svg` | Placeholder vector logo | Replace `public/assets/images/logo.svg` with the official high-res vector logo matching the WordPress site. |
| 3 | **Hiring Desk Email** | `config/brand.php`, `.env` | `hire@aroratechsolutions.com` | Ensure this email address or forwarder exists in cPanel/Google Workspace. |
| 4 | **Official Telephone** | `config/brand.php` | `+1 (800) 555-ARORA` (`+180055527672`) | Replace with active business phone number. |
| 5 | **WhatsApp Business Number** | `config/brand.php` | `+180055527672` | Confirm active WhatsApp number for quick-chat channels if activated. |
| 6 | **Operating Business Hours** | `config/brand.php` | `Mon-Fri: 9:00 AM - 6:00 PM EST` | Adjust to actual customer support / solutions desk availability. |
| 7 | **Corporate Physical Address** | `config/brand.php` | `Suite 400, Innovation Drive, NY` | Update with real registered company address. |
| 8 | **Social Media URLs** | `config/brand.php` | Placeholder LinkedIn / Twitter / GitHub URLs | Insert real Arora Tech Solutions company profiles. |
| 9 | **SLA Consultation Turnaround** | `includes/form-component.php`, `public/hire/full-stack-developers.php`, `public/contact.php` | "within one business day" / "24-48 hours" | Confirm your internal sales/technical recruiting team can meet this response SLA. |
| 10 | **WordPress Badge Usage** | `public/hire/wordpress-developers.php` | Text-based badge | Confirm that any WordPress/WooCommerce badges comply with trademark usage guidelines. |

---

## Part 2: Acceptance Testing Checklist

### 1. URL Routing & Server Health
- [ ] Subdomain resolves to `hire.aroratechsolutions.com` without SSL warnings.
- [ ] Root `/` loads the homepage cleanly.
- [ ] `/hire/full-stack-developers/` loads cleanly with trailing slash.
- [ ] Accessing `/hire/full-stack-developers` (without slash) redirects 301 to `/hire/full-stack-developers/`.
- [ ] Direct access to `.php` files (e.g. `/hire/full-stack-developers.php`) redirects 301 to clean URL.
- [ ] `/contact/` loads cleanly with clean URL.
- [ ] `/sitemap.xml` returns valid XML content-type with all URLs listed.
- [ ] `/robots.txt` is accessible and points to sitemap.
- [ ] Direct access to `config/`, `includes/`, `database/`, `.env` returns `403 Forbidden`.

### 2. Header & Brand Navigation
- [ ] Header sticks to viewport on scroll with subtle backdrop blur.
- [ ] "Hire Developers" dropdown opens the 12-role mega-menu with icons.
- [ ] Mega-menu closes on Escape key or outside click.
- [ ] "Visit Main Company Site" link opens `https://aroratechsolutions.com` in a new tab without affecting current session.
- [ ] Mobile hamburger toggle opens slide-in drawer smoothly on screens < 1024px.
- [ ] Mobile drawer links navigate properly and close the drawer.
- [ ] "Get a Quote" button smooth-scrolls directly to `#enquiry-section`.

### 3. Full Stack Developer Reference Page
- [ ] Hero displays H1 "Hire Dedicated Full Stack Developers" with split-screen workstation terminal.
- [ ] Code terminal mockup displays syntax-highlighted TypeScript snippet.
- [ ] Floating chips (React, Node, DB, API) render on desktop and gracefully hide on mobile viewports (<640px).
- [ ] Interactive Architecture Diagram: clicking each tier (Client, Gateway, Server, Persistence) updates the live insight card smoothly.
- [ ] Technology Stack tabs switch between Frontend, Backend, Databases, and Cloud without page reload.
- [ ] Engagement models (Hourly, Weekly, Monthly) clearly state "Best for" guidance.
- [ ] All 6 FAQ items expand and collapse smoothly with updated ARIA attributes.
- [ ] 3 related role cards link to Frontend, Backend, and React pages.
- [ ] Breadcrumbs display `Home > Hire Developers > Full Stack Developers`.

### 4. Enquiry Form Functionality & Anti-Abuse
- [ ] Form displays "Full Stack Developers" preselected as a locked pill badge.
- [ ] Multi-select technology chips toggle on/off when clicked.
- [ ] "+ Other" chip reveals a text input for custom frameworks.
- [ ] Segmented radio cards allow toggling between Hourly, Weekly, and Monthly.
- [ ] Desired seniority level defaults to Mid-Level and allows selection.
- [ ] Submitting empty required fields highlights them in red with inline error descriptions.
- [ ] Entering invalid email format triggers validation warning.
- [ ] Anti-Spam: Submitting with honeypot field filled returns simulated success without storing into database.
- [ ] Anti-Spam: Submitting in under 3 seconds triggers time-trap error notice.
- [ ] Anti-Spam: Submitting more than 5 times in 1 hour from same IP triggers 429 rate limit error.
- [ ] Valid submission stores complete record in MySQL table `hiring_enquiries`.
- [ ] Form displays animated checkmark and inline summary box with reference ID upon success.
- [ ] Reset button restores empty form for another submission.
- [ ] System sends admin lead email notification.
- [ ] System sends client confirmation email.
- [ ] If SMTP server is unreachable, enquiry is still stored safely in database and error is written to `logs/mail.log`.

### 5. Accessibility & Device Responsiveness
- [ ] Passes keyboard tab order check from top of page to footer.
- [ ] Skip to main content link works when pressing Tab immediately upon page load.
- [ ] All interactive elements display a clear, high-contrast focus ring.
- [ ] Tested on 320px mobile viewport: no horizontal scrollbar occurs.
- [ ] Tested on tablet (768px) and desktop (1280px / 1536px): grid adapts cleanly.
- [ ] `prefers-reduced-motion` mode tested: all animations and transitions are instant.
- [ ] WCAG 2.2 AA color contrast verified across all text and dark/light section backgrounds.

### 6. Isolation from Main WordPress Site
- [ ] Main WordPress site `aroratechsolutions.com` remains completely untouched.
- [ ] Subdomain database `arora_hire_db` operates with zero dependency on the WordPress database.
