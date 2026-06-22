// Services navigation config — single source of truth for the navbar dropdown.
//
// Add a new service page: set `live: true` and point `href` at the real route.
// Any item with `live: false` falls back to the /services index page so the link
// never 404s while the page is still being built.

export type ServiceItem = {
  label: string;
  href: string;
  live: boolean;
};

export type ServiceGroup = {
  title: string;
  items: ServiceItem[];
};

// Fallback target for services that don't have a dedicated page yet.
export const SERVICES_INDEX = "/services";

// Resolve the href an item should actually link to.
export function resolveHref(item: ServiceItem): string {
  return item.live ? item.href : SERVICES_INDEX;
}

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Websites",
    items: [
      { label: "Landing Pages", href: "/services/landing-pages", live: true },
      { label: "Business Websites", href: "/services/business-websites", live: true },
      { label: "Corporate Websites", href: "/services/corporate-websites", live: true },
      { label: "Portfolio Websites", href: "/services/portfolio-websites", live: true },
      { label: "Restaurant Websites", href: "/services/restaurant-websites", live: true },
      { label: "Hotel & Riad Websites", href: "/services/hotel-riad-websites", live: true },
      { label: "Real Estate Websites", href: "/services/real-estate-websites", live: true },
      { label: "Medical & Dental Sites", href: "/services/medical-websites", live: true },
      { label: "Law Firm Websites", href: "/services/law-firm-websites", live: true },
      { label: "Educational Websites", href: "/services/educational-websites", live: true },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { label: "Online Stores", href: "/services/online-stores", live: true },
      { label: "Multi-vendor Markets", href: "/services/multi-vendor-marketplaces", live: true },
      { label: "Subscription Sites", href: "/services/subscription-websites", live: true },
      { label: "Digital Product Stores", href: "/services/digital-product-stores", live: true },
    ],
  },
  {
    title: "Dashboards & Portals",
    items: [
      { label: "Admin Dashboards", href: "/services/admin-dashboards", live: true },
      { label: "Analytics Dashboards", href: "/services/analytics-dashboards", live: true },
      { label: "Customer Portals", href: "/services/customer-portals", live: true },
      { label: "Employee Portals", href: "/services/employee-portals", live: true },
      { label: "Reporting Systems", href: "/services/reporting-systems", live: true },
    ],
  },
  {
    title: "CRM & Business Systems",
    items: [
      { label: "CRM Systems", href: "/services/crm-systems", live: true },
      { label: "Lead Management", href: "/services/lead-management", live: true },
      { label: "Project Management", href: "/services/project-management", live: true },
      { label: "Inventory Management", href: "/services/inventory-management", live: true },
      { label: "HR Systems", href: "/services/hr-systems", live: true },
    ],
  },
  {
    title: "Booking & Reservations",
    items: [
      { label: "Hotel Booking Systems", href: "/services/hotel-booking-systems", live: true },
      { label: "Appointment Booking", href: "/services/appointment-booking", live: true },
      { label: "Tour Reservations", href: "/services/tour-reservations", live: true },
      { label: "Restaurant Reservations", href: "/services/restaurant-reservations", live: true },
      { label: "Event Booking", href: "/services/event-booking", live: true },
    ],
  },
  {
    title: "AI & Automation",
    items: [
      { label: "AI Chatbots", href: "/services/ai-chatbots", live: true },
      { label: "WhatsApp Automation", href: "/services/whatsapp-automation", live: true },
      { label: "Workflow Automation", href: "/services/workflow-automation", live: true },
      { label: "AI-Powered CRM", href: "/services/ai-crm", live: true },
      { label: "Email Automation", href: "/services/email-automation", live: true },
    ],
  },
  {
    title: "Authentication",
    items: [
      { label: "Login Pages", href: "/services/login-pages", live: true },
      { label: "User Portals", href: "/services/user-portals", live: true },
      { label: "Secure Auth Systems", href: "/services/auth-systems", live: true },
    ],
  },
  {
    title: "Niche / Special",
    items: [
      { label: "CRM for Travel Agencies", href: "/services/crm-for-travel-agencies", live: true },
      { label: "Booking Sites for Riads", href: "/services/booking-websites-for-hotels", live: true },
      { label: "Web Dev for Startups", href: "/services/web-developer-for-startups", live: true },
      { label: "Web Design Morocco", href: "/web-design-morocco", live: true },
    ],
  },
  {
    title: "Enterprise",
    items: [
      { label: "Enterprise Solutions", href: "/services/enterprise-solutions", live: true },
    ],
  },
];
