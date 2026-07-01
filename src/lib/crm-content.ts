// ─────────────────────────────────────────────────────────────────────────
// CRM public CONTENT API client (server-side) — portfolio, news, products.
// The ONLY file that knows the CRM base URL for public read content.
// (Lead submission lives separately in ./crm.ts — do not merge the two.)
//
// Rules (per SOP):
//  - Reads are OPEN (no key, no Authorization header).
//  - Every function wraps fetch in try/catch and returns a SAFE fallback
//    (empty array / null / zeroed pagination) — never throws, never crashes
//    the build or a request, even if the CRM is down or empty.
//  - next: { revalidate: 300 } on every fetch (matches the CRM's 5-min TTL).
// ─────────────────────────────────────────────────────────────────────────

const CRM_BASE = "https://crm.digitalstudiolf.online";
const REVALIDATE = 300; // seconds — matches CRM s-maxage

// ── Types (real field names from the API contract) ──────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// The CRM stores project results as {value, metric} objects (e.g.
// { value: "45%", metric: "Lead generation increased by" }).
export interface ProjectResult {
  value: string;
  metric: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  public_description: string | null;
  item_type: string | null;
  category: string | null;
  client_industry: string | null;
  client_name: string | null;
  year: number | null;
  duration_days: number | null;
  timeline: string | null;
  project_type: string | null;
  completed_date: string | null;
  tech_stack: string[];
  live_url: string | null;
  demo_url: string | null;
  hero_image_url: string | null;
  thumbnail_url: string | null;
  results: ProjectResult[];
  tags: string[];
  is_featured: boolean;
  display_order: number | null;
  view_count: number | null;
  published_at: string | null;
}

export interface PortfolioDetail extends PortfolioItem {
  challenge: string | null;
  solution: string | null;
  gallery_images: string[];
  gallery_meta: Record<string, string>;
  tools_used: string[];
  services_provided: string[];
  figma_url: string | null;
  github_url: string | null;
  video_url: string | null;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface Testimonial {
  id: string;
  client_name: string | null;
  client_role: string | null;
  client_company: string | null;
  client_avatar_url: string | null;
  testimonial_text: string;
  rating: number | null;
  display_order: number | null;
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  og_image_url: string | null;
  reading_time_minutes: number | null;
  language: string | null;
  author_display_name: string | null;
  published_at: string | null;
  updated_at: string | null;
  view_count: number | null;
  is_featured: boolean;
  category_name: string | null;
  category_slug: string | null;
  category_color: string | null;
}

export interface NewsTag {
  name: string;
  slug: string;
}

export interface NewsDetail extends NewsPost {
  content_html: string;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  noindex: boolean;
  category: { name: string; slug: string; color: string | null } | null;
  tags: NewsTag[];
}

export interface NewsCategory {
  name: string;
  slug: string;
  color?: string | null;
}

export interface Promotion {
  discounted_price: number;
  label: string | null;
  ends_at: string | null;
}

export type DeliveryType = "instant_download" | "external_checkout" | "contact";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  short_description: string | null;
  price: number | null;
  currency: string | null;
  compare_at_price: number | null;
  is_free: boolean;
  price_label: string | null;
  main_image_url: string | null;
  demo_url: string | null;
  buy_url: string | null;
  delivery_type: DeliveryType;
  download_url: string | null;
  is_featured: boolean;
  display_order: number | null;
  published_at: string | null;
  promotion: Promotion | null;
}

export interface ProductDetail extends Product {
  full_description: string | null;
  public_description: string | null;
  gallery_images: string[];
  gallery_meta: Record<string, string>;
  features: string[];
  tech_stack: string[];
  file_format: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────

function emptyPage<T>(limit = 12): PaginatedResponse<T> {
  return { items: [], total: 0, page: 1, limit };
}

async function getJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${CRM_BASE}${path}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    // CRM unreachable / network error / invalid JSON — fall back gracefully.
    console.warn(`[crm] fetch failed for ${path}`);
    return null;
  }
}

function qs(params?: string): string {
  if (!params) return "";
  return params.startsWith("?") ? params : `?${params}`;
}

// ── Portfolio ──────────────────────────────────────────────────────────

export async function getPortfolioList(params?: string): Promise<PaginatedResponse<PortfolioItem>> {
  const data = await getJson(`/api/public/portfolio${qs(params)}`);
  if (!data || !Array.isArray(data.items)) return emptyPage<PortfolioItem>();
  const items = data.items as PortfolioItem[];
  return {
    items,
    total: Number(data.total) || items.length,
    page: Number(data.page) || 1,
    limit: Number(data.limit) || 12,
  };
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const data = await getJson(`/api/public/portfolio/featured`);
  if (!data || !Array.isArray(data.items)) return [];
  return data.items as PortfolioItem[];
}

export async function getPortfolioItem(
  slug: string
): Promise<{ item: PortfolioDetail; testimonials: Testimonial[]; related: PortfolioItem[] } | null> {
  const data = await getJson(`/api/public/portfolio/${encodeURIComponent(slug)}`);
  if (!data || !data.item) return null;
  return {
    item: data.item as PortfolioDetail,
    testimonials: Array.isArray(data.testimonials) ? (data.testimonials as Testimonial[]) : [],
    related: Array.isArray(data.related) ? (data.related as PortfolioItem[]) : [],
  };
}

// ── News / Blog ──────────────────────────────────────────────────────────

export async function getNewsList(params?: string): Promise<PaginatedResponse<NewsPost>> {
  const data = await getJson(`/api/public/news${qs(params)}`);
  // News list uses `posts` as the array key — normalize to `items`.
  if (!data || !Array.isArray(data.posts)) return emptyPage<NewsPost>(9);
  const items = data.posts as NewsPost[];
  return {
    items,
    total: Number(data.total) || items.length,
    page: Number(data.page) || 1,
    limit: Number(data.limit) || 9,
  };
}

export async function getFeaturedPost(): Promise<NewsPost | null> {
  const data = await getJson(`/api/public/news/featured`);
  if (!data || !data.post) return null;
  return data.post as NewsPost;
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const data = await getJson(`/api/public/news/categories`);
  if (!data || !Array.isArray(data.categories)) return [];
  return data.categories as NewsCategory[];
}

export async function getNewsPost(
  slug: string
): Promise<{ post: NewsDetail; related: NewsPost[] } | null> {
  const data = await getJson(`/api/public/news/${encodeURIComponent(slug)}`);
  if (!data || !data.post) return null;
  return {
    post: data.post as NewsDetail,
    related: Array.isArray(data.related) ? (data.related as NewsPost[]) : [],
  };
}

// ── Landing Page Brain (CRM-controlled copy / SEO / FAQ / settings) ────────

export interface LandingSeo {
  page_key: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  og_image_url: string;
  focus_keyword: string;
  noindex: boolean;
}
export interface LandingFaq { id: number; question: string; answer: string; category: string; }
export interface LandingSettings {
  contact_email?: string;
  whatsapp?: string;
  calendly?: string;
  socials?: Record<string, string>;
  announcement_bar?: { enabled?: boolean; text?: string; href?: string };
}

/** All active landing sections keyed by section_key (hero, about, cta, …). */
export async function getLandingContent(): Promise<Record<string, Record<string, string>>> {
  const data = await getJson(`/api/public/landing/content`);
  const c = data?.content;
  return (c && typeof c === 'object') ? (c as Record<string, Record<string, string>>) : {};
}

/** Per-page SEO; null when the page has no record (use landing-side defaults). */
export async function getLandingSeo(pageKey: string): Promise<LandingSeo | null> {
  const data = await getJson(`/api/public/landing/seo/${encodeURIComponent(pageKey)}`);
  return (data?.seo as LandingSeo) || null;
}

export async function getLandingFaq(): Promise<LandingFaq[]> {
  const data = await getJson(`/api/public/landing/faq`);
  return Array.isArray(data?.faqs) ? (data.faqs as LandingFaq[]) : [];
}

export async function getLandingSettings(): Promise<LandingSettings> {
  const data = await getJson(`/api/public/landing/settings`);
  return (data?.settings as LandingSettings) || {};
}

// ── Products ──────────────────────────────────────────────────────────────

export async function getProductsList(params?: string): Promise<PaginatedResponse<Product>> {
  const data = await getJson(`/api/public/products${qs(params)}`);
  if (!data || !Array.isArray(data.items)) return emptyPage<Product>(60);
  const items = data.items as Product[];
  return {
    items,
    total: Number(data.total) || items.length,
    page: Number(data.page) || 1,
    limit: Number(data.limit) || 60,
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await getJson(`/api/public/products/featured`);
  if (!data || !Array.isArray(data.items)) return [];
  return data.items as Product[];
}

export async function getProduct(
  slug: string
): Promise<{ item: ProductDetail; related: Product[] } | null> {
  const data = await getJson(`/api/public/products/${encodeURIComponent(slug)}`);
  if (!data || !data.item) return null;
  return {
    item: data.item as ProductDetail,
    related: Array.isArray(data.related) ? (data.related as Product[]) : [],
  };
}
