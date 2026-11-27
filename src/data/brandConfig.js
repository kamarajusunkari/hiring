export const BRAND = {
  companyName: 'Arora Tech Solutions',
  legalName: 'Arora Tech Solutions Pvt. Ltd.',
  tagline: 'Your Next Developer Is Just One Step Away.',
  subtagline: 'On-demand engineering talent on flexible hourly, weekly, and monthly engagement models.',
  mainSiteUrl: 'https://aroratechsolutions.com',
  hireSiteUrl: 'https://hire.aroratechsolutions.com',
  contact: {
    email: 'hire@aroratechsolutions.com',
    phone: '+91 94938 98990',
    phoneRaw: '+919493898990',
    whatsappNumber: '919493898990',
    whatsappUrl: 'https://wa.me/919493898990',
    hours: 'Monday – Friday: 9:00 AM – 6:00 PM EST',
    address: 'Suite 400, Innovation Drive, New York, NY 10001, United States'
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/arora-tech-solutions',
    twitter: 'https://twitter.com/aroratechsol',
    github: 'https://github.com/arora-tech-solutions'
  }
};

export function getWhatsAppUrl(message = 'Hi Arora Tech Solutions, I would like to hire developers.') {
  const base = BRAND.contact.whatsappUrl;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  const url = getWhatsAppUrl(message);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    window.location.href = url;
  }
}
