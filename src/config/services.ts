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
      { label: "Corporate Websites", href: "/services/corporate-websites", live: false },
      { label: "Portfolio Websites", href: "/services/portfolio-websites", live: false },
      { label: "Restaurant Websites", href: "/services/restaurant-websites", live: false },
      { label: "Hotel & Riad Websites", href: "/services/hotel-riad-websites", live: false },
      { label: "Real Estate Websites", href: "/services/real-estate-websites", live: false },
      { label: "Medical & Dental Sites", href: "/services/medical-websites", live: false },
      { label: "Law Firm Websites", href: "/services/law-firm-websites", live: false },
      { label: "Educational Websites", href: "/services/educational-websites", live: false },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { label: "Online Stores", href: "/services/online-stores", live: false },
      { label: "Multi-vendor Markets", href: "/services/multi-vendor-marketplaces", live: false },
      { label: "Subscription Sites", href: "/services/subscription-websites", live: false },
      { label: "Digital Product Stores", href: "/services/digital-product-stores", live: false },
    ],
  },
  {
    title: "Dashboards & Portals",
    items: [
      { label: "Admin Dashboards", href: "/services/admin-dashboards", live: true },
      { label: "Analytics Dashboards", href: "/services/analytics-dashboards", live: false },
      { label: "Customer Portals", href: "/services/customer-portals", live: false },
      { label: "Employee Portals", href: "/services/employee-portals", live: false },
      { label: "Reporting Systems", href: "/services/reporting-systems", live: false },
    ],
  },
  {
    title: "CRM & Business Systems",
    items: [
      { label: "CRM Systems", href: "/services/crm-systems", live: true },
      { label: "Lead Management", href: "/services/lead-management", live: false },
      { label: "Project Management", href: "/services/project-management", live: false },
      { label: "Inventory Management", href: "/services/inventory-management", live: false },
      { label: "HR Systems", href: "/services/hr-systems", live: false },
    ],
  },
  {
    title: "Booking & Reservations",
    items: [
      { label: "Hotel Booking Systems", href: "/services/hotel-booking-systems", live: false },
      { label: "Appointment Booking", href: "/services/appointment-booking", live: false },
      { label: "Tour Reservations", href: "/services/tour-reservations", live: false },
      { label: "Restaurant Reservations", href: "/services/restaurant-reservations", live: false },
      { label: "Event Booking", href: "/services/event-booking", live: false },
    ],
  },
  {
    title: "Authentication",
    items: [
      { label: "Login Pages", href: "/services/login-pages", live: true },
      { label: "User Portals", href: "/services/user-portals", live: false },
      { label: "Secure Auth Systems", href: "/services/auth-systems", live: false },
    ],
  },
  {
    title: "Niche / Special",
    items: [
      { label: "CRM for Travel Agencies", href: "/services/crm-for-travel-agencies", live: true },
      { label: "Booking Sites for Riads", href: "/services/booking-websites-for-hotels", live: false },
      { label: "Web Dev for Startups", href: "/services/web-developer-for-startups", live: false },
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
