import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// On-demand revalidation receiver. The CRM POSTs here on
// publish/unpublish/update/delete so the landing page refreshes instantly
// (ISR every 300s is the fallback). Secret is server-only — never exposed.
export const dynamic = "force-dynamic";

type Body = {
  secret?: string;
  type?: "portfolio" | "news" | "product";
  slug?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const secret = process.env.LANDING_REVALIDATE_SECRET;
  if (!secret || body.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug } = body;

  switch (type) {
    case "portfolio":
      revalidatePath("/portfolio");
      if (slug) revalidatePath(`/portfolio/${slug}`);
      break;
    case "news":
      revalidatePath("/blog");
      if (slug) revalidatePath(`/blog/${slug}`);
      break;
    case "product":
      revalidatePath("/shop");
      if (slug) revalidatePath(`/shop/${slug}`);
      break;
    default:
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  // Featured/latest sections live on the homepage too.
  revalidatePath("/");

  return NextResponse.json({ revalidated: true, type, slug: slug ?? null });
}
