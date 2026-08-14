import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineArchiveBox,
  HiOutlineBolt,
  HiOutlineBuildingLibrary,
  HiOutlineBuildingOffice,
  HiOutlineBuildingOffice2,
  HiOutlineBuildingStorefront,
  HiOutlineCake,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineCloudArrowDown,
  HiOutlineCog6Tooth,
  HiOutlineCpuChip,
  HiOutlineCreditCard,
  HiOutlineDocumentChartBar,
  HiOutlineEnvelope,
  HiOutlineFunnel,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineIdentification,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineRocketLaunch,
  HiOutlineScale,
  HiOutlineServerStack,
  HiOutlineShieldCheck,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineTicket,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi2";

/**
 * One icon per service, keyed by the service's href.
 *
 * Heroicons v2 outline, the same set ServicesSection already uses on the
 * homepage — mixing icon families across two lists of the same services is the
 * kind of thing that reads as a bug rather than a choice.
 *
 * Keyed by full href, not by slug: four entries in `serviceGroups` live outside
 * /services/ (/booking-websites-for-hotels, /web-developer-for-startups,
 * /web-design-morocco), so a slug-only key would silently miss them.
 */
export const serviceIcons: Record<string, IconType> = {
  // Websites
  "/services/landing-pages": HiOutlineRocketLaunch,
  "/services/business-websites": HiOutlineBuildingOffice2,
  "/services/corporate-websites": HiOutlineBuildingLibrary,
  "/services/portfolio-websites": HiOutlineSparkles,
  "/services/restaurant-websites": HiOutlineCake,
  "/services/hotel-riad-websites": HiOutlineHomeModern,
  "/services/real-estate-websites": HiOutlineHome,
  "/services/medical-websites": HiOutlineHeart,
  "/services/law-firm-websites": HiOutlineScale,
  "/services/educational-websites": HiOutlineAcademicCap,

  // E-Commerce
  "/services/online-stores": HiOutlineShoppingCart,
  "/services/multi-vendor-marketplaces": HiOutlineBuildingStorefront,
  "/services/subscription-websites": HiOutlineCreditCard,
  "/services/digital-product-stores": HiOutlineCloudArrowDown,

  // Dashboards & Portals
  "/services/admin-dashboards": HiOutlineSquares2X2,
  "/services/analytics-dashboards": HiOutlineChartBar,
  "/services/customer-portals": HiOutlineUserCircle,
  "/services/employee-portals": HiOutlineIdentification,
  "/services/reporting-systems": HiOutlineDocumentChartBar,

  // CRM & Business Systems
  "/services/crm-systems": HiOutlineUserGroup,
  "/services/lead-management": HiOutlineFunnel,
  "/services/project-management": HiOutlineClipboardDocumentList,
  "/services/inventory-management": HiOutlineArchiveBox,
  "/services/hr-systems": HiOutlineUsers,

  // Booking & Reservations
  "/services/hotel-booking-systems": HiOutlineCalendarDays,
  "/services/appointment-booking": HiOutlineClock,
  "/services/tour-reservations": HiOutlineMapPin,
  "/services/restaurant-reservations": HiOutlineClipboardDocumentCheck,
  "/services/event-booking": HiOutlineTicket,

  // AI & Automation
  "/services/ai-chatbots": HiOutlineChatBubbleLeftRight,
  "/services/whatsapp-automation": HiOutlineChatBubbleOvalLeftEllipsis,
  "/services/workflow-automation": HiOutlineCog6Tooth,
  "/services/ai-crm": HiOutlineCpuChip,
  "/services/email-automation": HiOutlineEnvelope,

  // Authentication
  "/services/login-pages": HiOutlineLockClosed,
  "/services/user-portals": HiOutlineKey,
  "/services/auth-systems": HiOutlineShieldCheck,

  // Niche / Special
  "/services/crm-for-travel-agencies": HiOutlinePaperAirplane,
  "/booking-websites-for-hotels": HiOutlineBuildingOffice,
  "/web-developer-for-startups": HiOutlineBolt,
  "/web-design-morocco": HiOutlineGlobeAlt,

  // Enterprise
  "/services/enterprise-solutions": HiOutlineServerStack,
};

/**
 * Per-category fallback, so a service added to `serviceGroups` without a
 * matching entry above still renders a sensible icon instead of a hole in the
 * card grid.
 */
const categoryFallback: Record<string, IconType> = {
  Websites: HiOutlineGlobeAlt,
  "E-Commerce": HiOutlineShoppingCart,
  "Dashboards & Portals": HiOutlineSquares2X2,
  "CRM & Business Systems": HiOutlineUserGroup,
  "Booking & Reservations": HiOutlineCalendarDays,
  "AI & Automation": HiOutlineCpuChip,
  Authentication: HiOutlineLockClosed,
  "Niche Solutions": HiOutlineSparkles,
  Enterprise: HiOutlineServerStack,
};

export function getServiceIcon(href: string, category?: string): IconType {
  return (
    serviceIcons[href] ??
    (category ? categoryFallback[category] : undefined) ??
    HiOutlineGlobeAlt
  );
}
