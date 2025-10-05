import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const GTM_ID = "GTM-P2LJ8GNM"; // ✅ your GTM ID

    return (
      <Html lang="en">
        <Head>
          {/* ✅ Preconnect for better resource prioritization */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />

          {/* ✅ Use preload + font-display=swap for faster render & avoid FOIT */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans&family=Poppins:wght@400;500;800&family=Roboto:wght@400;700&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans&family=Poppins:wght@400;500;800&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
            media="all"
          />
          <style>{`
            /* ✅ Fallback font setup to reduce CLS before webfonts load */
            html {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
            }
          `}</style>

          {/* ✅ Include meta for theme color for mobile browser UI */}
          <meta name="theme-color" content="#870808" />
        </Head>
        <body>
          {/* ✅ GTM noscript fallback (non-blocking) */}
          {GTM_ID && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-P2LJ8GNM"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="GTM"
              ></iframe>
            </noscript>
          )}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
