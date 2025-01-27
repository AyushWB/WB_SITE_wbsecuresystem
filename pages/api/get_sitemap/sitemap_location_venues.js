export default async function handler(req, res) {
  const fetchPages = async () => {
    const response = await fetch('https://cms.weddingbanquets.in/api/sitemap_location_venues/1');
    const data = await response.json();
    return data.sitemap.map((page) => ({
      loc: `${process.env.SITE_URL || 'https://weddingbanquets.in'}/${page.url}`,
      lastmod: new Date().toISOString(),
      images: page.images?.map((image) => ({
        loc: `${process.env.SITE_URL || 'https://weddingbanquets.in'}/_next/image?url=${encodeURIComponent(image.loc)}&amp;w=1200&amp;q=75`,
        title: image.title || null,
        caption: image.caption || null,
      })) || [],
    }));
  };

  const generateSitemap = async () => {
    const pages = await fetchPages();
    let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
    pages.forEach((page) => {
      sitemapXML += `  <url>\n`;
      sitemapXML += `    <loc>${page.loc}</loc>\n`;
      sitemapXML += `    <lastmod>${page.lastmod}</lastmod>\n`;

      if (page.images.length > 0) {
        page.images.forEach((image) => {
          sitemapXML += `    <image:image>\n`;
          sitemapXML += `      <image:loc>${image.loc}</image:loc>\n`;
          if (image.title) {
            sitemapXML += `      <image:title>${image.title}</image:title>\n`;
          }
          if (image.caption) {
            sitemapXML += `      <image:caption>${image.caption}</image:caption>\n`;
          }
          sitemapXML += `    </image:image>\n`;
        });
      }

      sitemapXML += `  </url>\n`;
    });

    sitemapXML += `</urlset>\n`;

    return sitemapXML;
  };

  const sitemap = await generateSitemap();
  res.status(200).send(sitemap);
}
