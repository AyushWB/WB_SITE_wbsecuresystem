<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    version="1.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <!-- Check for lastmod, changefreq, and priority -->
    <xsl:variable name="has-lastmod" select="count(//sitemap:lastmod)"/>
    <xsl:variable name="has-changefreq" select="count(//sitemap:changefreq)"/>
    <xsl:variable name="has-priority" select="count(//sitemap:priority)"/>

    <xsl:template match="/">
        <html lang="en-US">
            <head>
                <title>XML Sitemap</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #444; }
                    #sitemap { max-width: 980px; margin: 0 auto; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 10px; border: 1px solid #ccc; }
                    tr:nth-child(odd) { background-color: #f9f9f9; }
                    a { text-decoration: none; }
                </style>
            </head>
            <body>
                <div id="sitemap">
                    <h1>XML Sitemap</h1>
                    <p>This XML Sitemap is generated for better SEO visibility.</p>
                    
                    <p>Number of URLs in this XML Sitemap: 
                        <xsl:value-of select="count(//sitemap:url)"/>
                    </p>

                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <xsl:if test="$has-lastmod">
                                    <th>Last Modified</th>
                                </xsl:if>
                                <xsl:if test="$has-changefreq">
                                    <th>Change Frequency</th>
                                </xsl:if>
                                <xsl:if test="$has-priority">
                                    <th>Priority</th>
                                </xsl:if>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="//sitemap:url">
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
                                    <xsl:if test="$has-changefreq">
                                        <td>
                                            <xsl:value-of select="sitemap:changefreq"/>
                                        </td>
                                    </xsl:if>
                                    <xsl:if test="$has-priority">
                                        <td>
                                            <xsl:value-of select="sitemap:priority"/>
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
