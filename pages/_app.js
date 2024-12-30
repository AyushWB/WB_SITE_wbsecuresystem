import { MyContextProvider } from "@/context/MyContext";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import { useRouter } from 'next/router';
import Layout from "@/components/layout.js/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(true); // State for toggling chat

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <MyContextProvider>
      <GlobalStyles />
      <Head>
        <title>Best Banquet Halls And Wedding Venues at 40% Discount</title>
        <meta
          name="description"
          content="Wedding Banquet To Plan Your Wedding And Make Sure It is a Memorable Occasion. Look Over 10000+ Indian Wedding Venues For Corporate Events, Weddings And Parties"
        />
        <meta
          name="keywords"
          content="Affordable Banquet Halls, Banquet Halls, Top Banquet Halls, Best Banquet Halls with price, Banquet Halls with review, Luxury Banquet Halls, Best Banquet Halls, List of Banquet Halls, Cheapest Banquet Halls, Banquet Halls near by, Banquet Halls near, Marriage Halls, Party Halls, Birthday Party Halls, Function Halls, Wedding Venues"
        />
        <meta name="author" content="y@sh" />
        <meta name="theme-color" content="#870808" />
        <meta name="msapplication-navbutton-color" content="#870808" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#870808" />
        <link
          rel="icon"
          type="image/png"
          href="https://weddingbanquets.in/fav-icon/favicon14.png"
        />
        <link rel="prefetch" href="https://weddingbanquets.in/logo.png" />
        <meta property="og:site_name" content="Weddingbanquets" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weddingbanquets" />
      </Head>
      <Layout>
        {loading && <LoadingScreen />}

        {/* WhatsApp Chat Widget */}
        <div>
          {chatOpen && (
            <div
              style={{
                position: "fixed",
                bottom: "130px",
                right: "25px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                width: "300px",
                zIndex: "999999",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#870808",
                  color: "#fff",
                  padding: "10px 15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ fontSize: "13px" }}>Dolly</strong>
                  <p style={{ margin: 0, fontSize: "13px" }}>Event Manager</p>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: "15px" }}>
                <p style={{ margin: 0, fontSize: "11px" }}>
                Wedding Banquets is your one-stop solution to all your wedding requirements, offering the best deals on wedding banquet halls with top wedding vendors. Explore endless options on our website. Get the best deal in Town. Contact us now and get discounts Upto 40%!
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=918882198989&text=Hi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginTop: "15px",
                    textAlign: "center",
                    backgroundColor: "#870808",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontSize: '12px'
                  }}
                >
                  Chat with Dolly
                </a>
              </div>
            </div>
          )}
          <div
            onClick={() => setChatOpen(true)}
            style={{
              position: "fixed",
              bottom: "70px",
              right: "25px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "999999",
            }}
          >
            <Image
              src="https://i.ibb.co/VgSspjY/whatsapp-button.png"
              alt="WhatsApp Icon"
              width={55}
              height={55}
            />
          </div>
        </div>

        <Component {...pageProps} />
      </Layout>
    </MyContextProvider>
  );
}
