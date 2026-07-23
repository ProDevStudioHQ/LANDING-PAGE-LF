// Long-form, service-specific prose for the templated /services/[slug] pages.
//
// Kept separate from services-content.ts so the structured config stays lean.
// The shared ServicePageTemplate renders these sections (when present for a slug)
// as an SEO "deep dive" block, lifting each templated page past the ~800-word
// threshold with genuinely useful, differentiated copy — not filler.
//
// Each entry: 2–3 headed sections. Bodies are unique per service and reinforce
// the focus keyword naturally without keyword stuffing.

export type DeepDiveSection = { heading: string; body: string };

export const serviceDeepDive: Record<string, DeepDiveSection[]> = {
  "corporate-websites": [
    {
      heading: "A corporate website that earns trust before the first meeting",
      body: "For an established firm, your website is often the first thing a prospective client, partner, or investor checks — long before they ever call. A cheap template undermines that first impression; a considered corporate website design reinforces it. We build multi-page sites with a clear information architecture so visitors can move from your homepage to a specific practice area, case study, or team member in a couple of clicks. Every page is written and structured around how decision-makers actually evaluate a company: proof of expertise, evidence of results, and an obvious way to get in touch. The result is a site that does quiet, consistent selling for you around the clock.",
    },
    {
      heading: "Built for scale, consistency, and long-term ownership",
      body: "Corporate sites rarely stay static — teams change, services expand, and press coverage accumulates. We architect your site on a maintainable design system so new pages always match your brand, and an optional CMS lets your marketing team publish news, case studies, or leadership updates without a developer. If you're replacing an existing site, we migrate your content and set up 301 redirects so the SEO equity you've already built carries over cleanly. With English, French, and Arabic support and proper hreflang, a single corporate presence can serve local Moroccan clients and international stakeholders at once. You own the code and the hosting, with no lock-in.",
    },
  ],
  "portfolio-websites": [
    {
      heading: "Make the work the hero, not the layout",
      body: "A portfolio website design should disappear behind your projects. We build fast, image-first galleries where typography, spacing, and interaction all serve one goal: keeping the visitor's eye on your work. Photographers get full-bleed galleries and lightboxes tuned for high-resolution images; designers and studios get case-study layouts that tell the story behind each project — the brief, the process, the result. Because creative buyers judge quickly, we obsess over load speed: images are served as optimised WebP with lazy-loading, so a gallery stays razor-sharp while pages still open in under two seconds on mobile.",
    },
    {
      heading: "Update it yourself, and get found",
      body: "New work is only valuable if you can publish it easily. We can wire your portfolio to a simple CMS so adding a project is a two-minute job — upload, caption, publish — no developer required. On the SEO side, each project page gets clean, descriptive markup and image alt text, which helps your work surface in Google Images and search for your name and niche. Whether you're an architect, illustrator, developer, or creative agency, the site is built to convert a browsing visitor into an enquiry, with clear contact points on every project and an obvious path to work with you.",
    },
  ],
  "restaurant-websites": [
    {
      heading: "From a hungry Google search to a booked table",
      body: "Most restaurant traffic starts on a phone: someone searching \"restaurant near me\" or your name plus \"menu\". A restaurant website design that loads slowly or hides the essentials loses that diner in seconds. We put the things people actually want — menu, opening hours, location, and a way to reserve — within a tap of the homepage. Menus are built as real, crawlable web pages (not a slow PDF), so Google can read them and show them in results. Add click-to-call, embedded maps, and a reservation flow, and the site turns local searches directly into covers.",
    },
    {
      heading: "Local SEO and mobile speed that fill quiet nights",
      body: "Ranking locally is about more than keywords. We set up your site with LocalBusiness structured data, consistent name-address-phone details, and fast, mobile-first pages so you compete in the local pack and map results. Photography-heavy sections are optimised so your dishes look irresistible without slowing the page. For groups with multiple locations, or a café that also does events and catering, we structure the site so each offering has its own clear, rankable page. Everything is editable, so updating a seasonal menu or holiday hours never means calling a developer.",
    },
  ],
  "hotel-riad-websites": [
    {
      heading: "Own your bookings — and stop paying commission",
      body: "Every reservation that comes through Booking.com or Expedia costs you 15–25% in commission and hands the guest relationship to a third party. A direct-booking hotel and riad website design flips that: guests find you, book with you, and become your contacts, not the OTA's. We build fast, visual sites that capture the atmosphere of your property and guide visitors from browsing rooms to confirming a stay, with a booking flow that works as smoothly on a phone as on a laptop. The commission you save on even a handful of direct bookings a month typically pays for the site many times over.",
    },
    {
      heading: "Built for riads, boutique hotels, and international guests",
      body: "Riads and boutique properties sell an experience, so the site has to feel like the place — considered photography, calm layouts, and the practical details international travellers need. We support English, French, and Arabic with proper hreflang, so a guest in Paris and a guest in London each land on the right version. Room pages, availability, rates, and policies are all structured clearly, and we can integrate the booking engine or channel manager you already use. The goal is a website that converts dreamers into confirmed reservations while giving you full ownership of your rates, your calendar, and your guest data.",
    },
  ],
  "real-estate-websites": [
    {
      heading: "Property search that keeps buyers on your site",
      body: "Buyers and renters filter ruthlessly — by area, price, bedrooms, type — and abandon sites that make it hard. Our real estate website development gives you fast, filterable listings with map views, high-quality photo galleries, and detail pages that answer the obvious questions before a visitor has to ask. Listings are structured so Google can read them, helping individual properties surface in search. For agencies with changing inventory, we build an admin area (or integrate your existing feed) so adding, editing, or marking a property as sold takes seconds and never requires a developer.",
    },
    {
      heading: "Turn interest into qualified leads",
      body: "Traffic is only useful if it becomes contacts. We place lead-capture forms and enquiry buttons where intent is highest — on each property, on saved searches, and on the contact page — and wire them straight to your inbox or CRM so no enquiry goes cold. Optional features like viewing-request scheduling, mortgage or price calculators, and neighbourhood guides keep serious buyers engaged and coming back. Whether you're an individual agent, a growing agency, or a developer marketing a new project, the site is engineered to generate and organise the leads that actually close.",
    },
  ],
  "medical-websites": [
    {
      heading: "A clinic website that builds patient confidence",
      body: "Patients choose a clinic partly on trust, and your website is where that trust is won or lost. Our medical and dental website design leads with the things that reassure — clear service and treatment pages, doctor profiles with real credentials, and honest, readable information — presented in a calm, professional design. Everything is mobile-first, because most patients search on their phones, and fast, because a slow health site erodes confidence immediately. The structure is built so someone can go from a symptom-led search to understanding how you can help, and then to booking, without friction.",
    },
    {
      heading: "Bookings, privacy, and being found locally",
      body: "We integrate appointment booking so patients can request or schedule a visit directly, cutting phone-tag for your front desk. Contact and intake forms are handled with privacy in mind, and the site is structured to rank for the local, service-specific searches that bring in new patients — your city plus the treatment they need. Individual pages for each service or specialty give you more surface area in search and let you speak precisely to each patient's concern. For multilingual practices, English, French, and Arabic are supported so every patient can read everything in the language they trust.",
    },
  ],
  "law-firm-websites": [
    {
      heading: "Authority is the whole point",
      body: "People hire lawyers they perceive as competent and credible, and a law firm website design has one core job: to establish that authority fast. We build clear practice-area pages that explain what you do and who you help, attorney profiles that surface real experience and credentials, and a restrained, professional design that signals seriousness. Each practice area gets its own page so the site speaks directly to a client's specific problem — and so it can rank for those specific searches rather than competing with itself on one generic page.",
    },
    {
      heading: "Turn research into consultations",
      body: "Prospective clients research quietly before they ever call, so we make the next step obvious and low-friction: prominent consultation forms, click-to-call, and clear contact options on every page. The site is structured with the schema and content depth that both search engines and cautious clients reward, and it's fast and mobile-first because credibility collapses on a slow, clunky site. With English, French, and Arabic support, a single firm site can serve local and international clients, and an optional CMS lets you publish articles that demonstrate expertise and pull in search traffic over time.",
    },
  ],
  "educational-websites": [
    {
      heading: "Present programs clearly, enroll students online",
      body: "Whether you're a school, a private tutor, or a course creator, your website has to do two things well: explain what you teach clearly, and make signing up easy. Our educational website development gives each program or course its own structured page — curriculum, outcomes, schedule, and price — so prospective students and parents can evaluate the fit without emailing you first. Clear calls to action move interested visitors toward enrollment or enquiry, and the whole site is fast and mobile-first because families and learners overwhelmingly browse on phones.",
    },
    {
      heading: "Portals and content you can manage yourself",
      body: "As you grow, you'll want to update courses, post news, and manage enrolled students without a developer. We build on a CMS so staff can edit content directly, and we can add a student portal for course materials, schedules, and announcements behind a secure login. Online enrollment and payment can be integrated so students go from interested to signed up in one flow. For institutions serving mixed audiences, English, French, and Arabic are supported, and the site is structured to rank for the program- and location-specific searches that bring in new students.",
    },
  ],
  "online-stores": [
    {
      heading: "A store engineered to sell, not just to exist",
      body: "Plenty of online stores look fine and still convert poorly, usually because the path from product to paid is slower or more confusing than it should be. Our online store development focuses relentlessly on that path: fast product pages, clear imagery and descriptions, an obvious add-to-cart, and a short, trustworthy checkout. Speed is treated as a feature, because every extra second of load time measurably costs sales on mobile. The result is a storefront built around conversion, not just catalogue.",
    },
    {
      heading: "Inventory, payments, and room to grow",
      body: "Behind the storefront you get the tools to actually run the shop: product and inventory management, secure payment integration, and order handling that doesn't require technical skill. We structure product data cleanly so your items are eligible for rich results and easier to find in search, and we build in the upsell and cross-sell moments that lift average order value. Whether you're launching your first store or replacing a slow, dated one, the platform is built to scale with your catalogue and your traffic — and you keep full ownership of the store and its data.",
    },
  ],
  "multi-vendor-marketplaces": [
    {
      heading: "A platform where many sellers can thrive",
      body: "A marketplace is a different beast from a single store: you're running a two-sided platform where independent vendors list, sell, and get paid, while you keep the whole thing running smoothly. Our multi-vendor marketplace development handles that complexity — vendor registration and onboarding, individual seller storefronts, product listings, and order routing — so each vendor gets a self-service experience and buyers get one seamless place to shop. The architecture is built to scale, because a marketplace's value grows with every vendor and product you add.",
    },
    {
      heading: "Commissions, moderation, and control",
      body: "The economics of a marketplace live in its admin tools. We build commission management so your cut is calculated and tracked automatically, payout handling for vendors, and moderation controls so you can approve sellers and review listings before they go live. Analytics give you visibility into which vendors and categories are performing. Everything is designed so you can grow from a handful of sellers to hundreds without the platform — or your workload — breaking. If you're launching a niche marketplace, we help you get the first vendor and buyer experiences right, because that's what makes the flywheel start turning.",
    },
  ],
  "subscription-websites": [
    {
      heading: "Turn one-off visitors into recurring revenue",
      body: "Subscription websites trade the scramble of chasing every sale for predictable, recurring revenue — but only if the billing, access, and member experience are solid. Our subscription website development builds automated recurring billing, secure member portals, and content gating so members see exactly what their plan includes and upgrading unlocks more instantly. Whether you're running a membership community, a SaaS product, or a creator business, the platform is built to run itself: sign-ups, renewals, and access are handled automatically, so you spend your time on the content and the community, not the plumbing.",
    },
    {
      heading: "Retention is built in from day one",
      body: "Recurring businesses live and die on churn, so we build in the tools that keep members around: self-service account management, clear plan upgrades and downgrades, automated lifecycle emails, and an admin dashboard that shows plans, active members, and revenue at a glance. Content gating is flexible, so you can offer free tiers, trials, and premium levels without workarounds. Payment flows are secure and reliable, because a failed renewal is lost revenue. The result is a platform you can grow confidently — one where every new member compounds instead of resetting to zero each month.",
    },
  ],
  "digital-product-stores": [
    {
      heading: "Sell downloads without the manual work",
      body: "If you sell templates, ebooks, courses, presets, or any downloadable product, the magic is instant, automated delivery. Our digital product store development gives customers their files the moment payment clears — no manual emailing, no delay — while license keys and access are managed automatically behind the scenes. The storefront is built for conversion, with clean product pages and a fast, trustworthy checkout, so the buying experience matches the quality of what you're selling.",
    },
    {
      heading: "Licensing, upsells, and scale",
      body: "Digital products have their own needs: protecting your files, issuing and validating licenses, and handling refunds or re-downloads gracefully. We build that in, along with upsell and bundle moments that lift average order value without feeling pushy. Because there's no physical inventory, the store scales effortlessly — the same setup that sells ten products a month sells ten thousand. Clean product data helps your items get found in search, and you keep full ownership of the store, the customer list, and the revenue, with no marketplace taking a cut of every sale.",
    },
  ],
  "admin-dashboards": [
    {
      heading: "Replace spreadsheets with a system that fits your business",
      body: "Most businesses outgrow spreadsheets long before they replace them, and the cost shows up as duplicated data, manual errors, and reports that take hours to assemble. A custom admin dashboard puts your real operational data — orders, users, bookings, metrics, whatever you run on — into one clear interface built around how your team actually works. Instead of bending your process to fit off-the-shelf software, the dashboard is shaped to your workflow, with the views, filters, and actions your team needs and none of the clutter they don't.",
    },
    {
      heading: "Clear at a glance, fast to act on",
      body: "A good dashboard answers questions instantly. We design stat cards, charts, and tables that surface what matters, with sidebar navigation that keeps everything a click away, and responsive layouts so managers can check in from a laptop or a phone. Role-based access means each team member sees exactly what they should. Because it's custom, we can wire it into your existing databases, tools, and APIs, so the dashboard reflects live reality rather than yesterday's export. The outcome is faster decisions, fewer errors, and a single place your team trusts to run the day.",
    },
  ],
  "analytics-dashboards": [
    {
      heading: "Turn scattered data into decisions",
      body: "Data spread across tools, exports, and spreadsheets doesn't drive decisions — it just creates busywork. A custom analytics dashboard pulls your key metrics into one live view, so the numbers that matter to your business are visible without anyone assembling a report. We design the visualisations around the questions you actually ask: how are we trending, where's the drop-off, which segment is growing. Charts, KPIs, and comparisons are laid out to be read in seconds, not decoded.",
    },
    {
      heading: "Live, connected, and built for your metrics",
      body: "Off-the-shelf analytics tools show you generic metrics; a custom dashboard shows you yours, defined the way your business defines them. We integrate your data sources — databases, product events, third-party APIs — so the dashboard reflects real-time reality, and we build in filtering and date ranges so anyone can drill into a trend without exporting anything. Role-based views keep each team focused on their numbers. The result is a single source of truth that replaces the weekly reporting scramble and lets your team spot problems and opportunities while there's still time to act.",
    },
  ],
  "customer-portals": [
    {
      heading: "Give customers a self-service home",
      body: "A customer portal turns repetitive support requests into self-service. Instead of emailing you for an invoice, an order status, or a document, your customers log in and get it themselves — instantly, at any hour. Our customer portal development builds secure, branded portals where clients can see their account, track orders or projects, access files, and manage their details. It's better for them, because answers are immediate, and better for you, because your team stops fielding the same questions over and over.",
    },
    {
      heading: "Secure, branded, and integrated",
      body: "Portals handle sensitive data, so we build them with secure authentication, role-based access, and careful handling of customer information. The portal carries your branding, so it feels like a natural extension of your business rather than a bolted-on tool, and it's responsive so customers can use it from any device. We integrate it with the systems you already run — your CRM, billing, or order management — so the information customers see is always current. The result is a professional self-service experience that raises satisfaction while measurably reducing your support load.",
    },
  ],
  "employee-portals": [
    {
      heading: "One place for everything your team needs",
      body: "When policies live in inboxes, forms live in shared drives, and announcements get lost in chat, employees waste time and things slip. An employee portal centralises it: documents, HR forms, company announcements, schedules, and internal tools behind a single secure login. Our employee portal development builds an intranet shaped to how your organisation actually works, so staff find what they need in seconds instead of asking around — and onboarding a new hire means pointing them to one place rather than a dozen.",
    },
    {
      heading: "Secure access, structured for real organisations",
      body: "Different roles need different things, so we build role-based access that shows each employee the tools and information relevant to them, and keeps sensitive material restricted appropriately. The portal is responsive, so staff can reach it from the office, home, or the field, and it integrates with your existing HR and internal systems so records stay consistent. Whether you're a growing company formalising its internal tooling or an established firm replacing a clunky intranet, the portal is built to scale with your headcount and to make internal communication measurably smoother.",
    },
  ],
  "reporting-systems": [
    {
      heading: "Stop building the same report by hand every week",
      body: "Manual reporting is a quiet tax on your team: hours spent every week pulling data, pasting it into spreadsheets, and formatting the same charts. A custom reporting system automates that end to end. It connects to your data, applies your logic, and produces the reports your business runs on — scheduled, consistent, and always up to date. The time your team gets back is real, and the numbers stop drifting because there's one automated process instead of several hand-built ones.",
    },
    {
      heading: "Reports that fit your business, delivered automatically",
      body: "Generic reporting tools force your data into their templates. We build reporting around your definitions — your KPIs, your segments, your formats — and can schedule reports to generate and deliver automatically to the right people. Exports to the formats you already use, drill-downs for when someone needs detail, and role-based access so each stakeholder sees the right view. By integrating directly with your databases and tools, the system reports on live reality, eliminating the copy-paste errors that creep into manual work and giving leadership numbers they can actually trust.",
    },
  ],
  "crm-systems": [
    {
      heading: "A CRM built around how you actually sell",
      body: "Off-the-shelf CRMs force your business into someone else's idea of a pipeline, and most teams end up either fighting the tool or quietly abandoning it. A custom CRM system inverts that: we build it around your real process — your stages, your fields, your workflow — so it fits like it was made for you, because it was. Leads, contacts, deals, notes, and communication history live in one place your team will actually use, with the clutter of features you don't need stripped out.",
    },
    {
      heading: "One source of truth for the whole team",
      body: "The value of a CRM compounds when everyone uses it. We build clear pipeline and workflow views, team access with appropriate permissions, and communication tracking so nothing falls between people. Because it's custom, we can integrate it with your website forms, email, and the other tools you rely on, so leads flow in automatically and context follows every contact. Whether you're an agency, a service business, or a sales team, the outcome is the same: fewer dropped leads, clearer accountability, and a single trusted record of every client relationship — owned entirely by you.",
    },
  ],
  "lead-management": [
    {
      heading: "Stop losing leads to the gaps",
      body: "Leads slip away in the gaps — the enquiry that lands in an inbox no one checks, the follow-up nobody remembers, the promising contact with no clear next step. A lead management system closes those gaps by capturing every lead in one place and giving each a clear owner, status, and next action. Our lead management development wires your website forms, ads, and other sources straight into the system, so a new enquiry is logged and assigned the moment it arrives, not whenever someone happens to notice.",
    },
    {
      heading: "Follow up faster, convert more",
      body: "Speed and consistency win deals. We build in lead scoring and status tracking so your team focuses on the hottest prospects first, automated reminders so follow-ups actually happen, and a pipeline view that shows exactly where every lead stands. Reporting reveals which sources produce real customers, so you can spend your marketing budget where it pays off. Integrated with your CRM and communication tools, the system turns a chaotic stream of enquiries into an organised, measurable process — one where more of the leads you already generate turn into paying clients.",
    },
  ],
  "project-management": [
    {
      heading: "Run projects on one system your team trusts",
      body: "When tasks live in chat, deadlines live in someone's head, and status lives in a meeting, projects drift. A custom project management system puts tasks, timelines, assignments, and progress in one clear place, shaped around how your team actually delivers work. Our project management development builds the boards, lists, and views your team needs — not the sprawling feature set of generic tools that most people use ten percent of — so adopting it feels like relief rather than another chore.",
    },
    {
      heading: "Visibility for the team and for you",
      body: "Good project software answers two questions instantly: what should I do next, and are we on track. We build task assignment and status tracking so every team member knows their part, and dashboards so managers see progress, bottlenecks, and deadlines at a glance. Role-based access keeps clients or stakeholders looped in on exactly what they should see and nothing more. Integrated with your existing tools and built to fit your workflow, the system replaces status-meeting guesswork with a live, shared picture of where every project really stands.",
    },
  ],
  "inventory-management": [
    {
      heading: "Know exactly what you have, everywhere",
      body: "Guessing at stock levels costs money in both directions — lost sales when you run out, tied-up cash when you over-order. A custom inventory management system gives you accurate, real-time stock across products and locations, so decisions are based on what you actually have rather than a spreadsheet someone updated last week. Our inventory management development tracks stock movements automatically, so every sale, return, and restock is reflected instantly and your numbers stay trustworthy.",
    },
    {
      heading: "Automate the tedious, catch problems early",
      body: "We build in the automation that prevents costly mistakes: low-stock alerts so you reorder before you sell out, reporting that shows what's moving and what's sitting, and multi-location support so a business with several sites sees one accurate picture. The system integrates with your sales channels and other tools, so inventory, orders, and fulfilment stay in sync without manual reconciliation. Whether you're a retailer, a wholesaler, or running stock behind an online store, the result is fewer stockouts, less dead capital, and hours of manual counting and updating handed back to your team.",
    },
  ],
  "hr-systems": [
    {
      heading: "Bring HR out of spreadsheets and inboxes",
      body: "As a team grows, managing people on spreadsheets and email quietly becomes a liability — records go out of date, leave requests get lost, and onboarding is reinvented every time. A custom HR system centralises employee records, leave and attendance, and the everyday HR workflows into one secure place. Our HR system development shapes it around your actual policies and structure, so it supports how your organisation really runs rather than forcing you into a rigid off-the-shelf model.",
    },
    {
      heading: "Secure, self-service, and built to grow",
      body: "We build employee self-service so staff can request leave, view records, and access documents themselves, cutting the back-and-forth that clogs HR's day. Role-based access protects sensitive personnel data, and approval workflows route requests to the right managers automatically. Reporting gives leadership visibility into headcount, leave, and other people metrics without manual collation. Integrated with your payroll and internal tools and built to scale with your headcount, the system turns HR admin from a growing burden into a smooth, reliable process — freeing your team to focus on people rather than paperwork.",
    },
  ],
  "hotel-booking-systems": [
    {
      heading: "Take direct bookings and keep the commission",
      body: "A hotel booking system built into your own website lets guests check availability, choose a room, and confirm a stay directly with you — no OTA commission, no lost guest relationship. Our hotel booking system development builds real-time availability, rate management, and a smooth reservation flow that works as well on a phone as on a desktop. Every direct booking is one you don't pay 15–25% commission on, so for most properties the system pays for itself quickly and then keeps paying.",
    },
    {
      heading: "Manage rates, availability, and guests in one place",
      body: "Behind the booking flow, you get the controls to actually run occupancy: manage room types and rates, block dates, and see reservations at a glance. We can integrate with your channel manager so your calendar stays synced across platforms and you avoid double-bookings. Automated confirmation emails and guest data capture mean every reservation builds your own guest list, not the OTA's. Whether you run a boutique hotel, a riad, or a small group of properties, the system is built to increase direct revenue and give you full ownership of your rates, your calendar, and your guest relationships.",
    },
  ],
  "appointment-booking": [
    {
      heading: "Let clients book themselves, around the clock",
      body: "Every appointment booked by phone ties up your staff and only works during opening hours — while the client who wanted to book at 10pm has already moved on. An appointment booking system lets clients see real availability and book themselves at any time, from any device. Our appointment booking development builds a smooth self-scheduling flow tuned to your services and durations, so the calendar fills without anyone playing phone-tag, and your team gets their time back for the work that matters.",
    },
    {
      heading: "Fewer no-shows, less admin",
      body: "We build in the features that make self-booking reliable: real-time availability so double-bookings can't happen, automated confirmation and reminder messages that measurably cut no-shows, and easy rescheduling so a change doesn't become a phone call. The system can integrate with your existing calendar and take deposits or payments at booking where that helps. Whether you run a clinic, a salon, a studio, or a professional service, the result is a fuller, better-organised schedule, fewer gaps from no-shows, and hours of manual booking admin removed from your team's week.",
    },
  ],
};

export function getServiceDeepDive(slug: string): DeepDiveSection[] | undefined {
  return serviceDeepDive[slug];
}
