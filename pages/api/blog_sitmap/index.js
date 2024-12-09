import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/blog_sitmap`);
    const blogs = await response.json();

    if (!Array.isArray(blogs)) {
      throw new Error('Expected an array of blogs from the API response');
    }

    const baseUrl = 'https://weddingbanquets.in/blog';
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogs
        .map(blog => `
    <url>
      <loc>${baseUrl}/${blog.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  `)
        .join('')}
</urlset>`;

    // Save the sitemap in the public directory
    const filePath = path.join(process.cwd(), 'public', 'blog_sitemap.xml');
    fs.writeFileSync(filePath, sitemapContent);

    res.status(200).json({ message: 'Sitemap generated successfully!' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
