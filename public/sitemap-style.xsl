<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" 
    version="1.0" 
    exclude-result-prefixes="sitemap">

    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <!-- Detect if lastmod is present -->
    <xsl:variable name="has-lastmod" select="count(/sitemap:sitemapindex/sitemap:sitemap/sitemap:lastmod)"/>

    <xsl:template match="/">
        <html lang="en-US">
        <head>
            <title>XML Sitemap</title>
            <style>
                body { font-family: Arial, sans-serif; color: #444; }
                #sitemap { max-width: 980px; margin: 0 auto; }
                #sitemap__table { width: 100%; border: solid 1px #ccc; border-collapse: collapse; }
                #sitemap__table tr th, #sitemap__table tr td { padding: 10px; text-align: left; }
                #sitemap__table tr:nth-child(odd) td { background-color: #eee; }
                a { text-decoration: none; color: blue; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div id="sitemap">
                <h1>XML Sitemap</h1>
                <p>This XML Sitemap is generated for better SEO visibility.</p>
                <table id="sitemap__table">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <xsl:if test="$has-lastmod">
                                <th>Last Modified</th>
                            </xsl:if>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                            <tr>
                                <td>
                                    <a href="{sitemap:loc}">
                                        <xsl:value-of select="sitemap:loc"/>
                                    </a>
                                </td>
                                <xsl:if test="$has-lastmod">
                                    <td>
                                        <xsl:value-of select="sitemap:lastmod"/>
                                    </td>
                                </xsl:if>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
