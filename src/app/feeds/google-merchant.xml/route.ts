import { allProducts, collectionsOf } from "@/lib/catalog";
import { site } from "@/data/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plainText(html: string, max = 4900): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.slice(0, max);
}

/**
 * Google Merchant Center product feed (RSS 2.0 + g: namespace).
 * Add in Merchant Center: Products -> Data sources -> Add product feed ->
 * Scheduled fetch -> {site}/feeds/google-merchant.xml
 */
export function GET() {
  const items: string[] = [];

  for (const p of allProducts) {
    const link = `${site.domain}/products/${p.handle}`;
    const description = plainText(p.descriptionHtml) || p.title;
    const productType = collectionsOf(p)
      .map((c) => c.title)
      .join(" > ");
    const images = p.images.map((i) => site.domain + i);
    const multiVariant = p.variants.length > 1;

    for (const v of p.variants) {
      const title =
        multiVariant && v.title !== "Default Title" ? `${p.title} — ${v.title}` : p.title;
      const additional = images
        .slice(1, 11)
        .map((u) => `      <g:additional_image_link>${esc(u)}</g:additional_image_link>`)
        .join("\n");

      items.push(`    <item>
      <g:id>${v.id}</g:id>
${multiVariant ? `      <g:item_group_id>${p.id}</g:item_group_id>\n` : ""}      <g:title>${esc(title.slice(0, 150))}</g:title>
      <g:description>${esc(description)}</g:description>
      <g:link>${esc(link)}</g:link>
      <g:image_link>${esc(images[0] ?? "")}</g:image_link>
${additional ? additional + "\n" : ""}      <g:availability>${v.available ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${v.compareAtPrice && v.compareAtPrice > v.price ? v.compareAtPrice.toFixed(2) : v.price.toFixed(2)} INR</g:price>
${v.compareAtPrice && v.compareAtPrice > v.price ? `      <g:sale_price>${v.price.toFixed(2)} INR</g:sale_price>\n` : ""}      <g:condition>new</g:condition>
      <g:brand>${esc(site.name)}</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
${productType ? `      <g:product_type>${esc(productType)}</g:product_type>\n` : ""}      <g:shipping>
        <g:country>IN</g:country>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(site.name)} — ${esc(site.tagline)}</title>
    <link>${site.domain}</link>
    <description>${esc(site.description)}</description>
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
