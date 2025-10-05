import { MyContextProvider } from "@/context/MyContext";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import Layout from "@/components/layout.js/Layout";
import Head from "next/head";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Image from "next/image";

const LoadingScreen = dynamic(() => import("./loading"), { ssr: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [eventManager, setEventManager] = useState(null);
  const chatBoxRef = useRef(null);
  const GTM_ID = "GTM-P2LJ8GNM";  // Replace with your actual GTM ID

  const handleStart = useCallback(() => setLoading(true), []);
  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    let aborted = false;
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;

    const doFetch = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAINN}/api/get_random_rm`,
          controller ? { signal: controller.signal } : undefined
        );
        if (!response.ok) return;
        const data = await response.json();
        if (!aborted) setEventManager(data);
      } catch (error) {
        if (!aborted) console.error("Error fetching event manager:", error);
      }
    };

    const schedule = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        requestIdleCallback(doFetch, { timeout: 2000 });
      } else {
        setTimeout(doFetch, 0);
      }
    };

    schedule();

    return () => {
      aborted = true;
      if (controller) controller.abort();
    };
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events, handleStart, handleComplete]);

  useEffect(() => {
    const openIfNeeded = () => {
      try {
        const lastOpened = localStorage.getItem("chatLastOpened");
        const now = Date.now();
        if (!lastOpened || now - parseInt(lastOpened, 10) > 3600000) {
          setChatOpen(true);
          setShowContent(true);
          localStorage.setItem("chatLastOpened", String(now));
          setTimeout(() => {
            setShowContent(false);
            setChatOpen(false);
          }, 2000);
        }
      } catch {
        // ignore
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(openIfNeeded, { timeout: 3000 });
    } else {
      setTimeout(openIfNeeded, 500);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target) &&
        !event.target.closest(".whatsapp-icon")
      ) {
        setChatOpen(false);
        setShowContent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chatBoxStyle = useMemo(
    () => ({
      position: "fixed",
      bottom: "130px",
      right: "25px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      borderRadius: "10px",
      width: "300px",
      zIndex: 999999,
      overflow: "hidden",
    }),
    []
  );

  const whatsappFabStyle = useMemo(
    () => ({
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
      zIndex: 999999,
    }),
    []
  );

  const notifDotStyle = useMemo(
    () => ({
      position: "absolute",
      top: "5px",
      right: "5px",
      backgroundColor: "red",
      color: "#fff",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
    }),
    []
  );

  const handleWhatsAppClick = useCallback(() => {
    setChatOpen(true);
    setShowContent(true);
    setNotificationCount(0);
  }, []);

  const handleCloseChat = useCallback(() => {
    setChatOpen(false);
    setShowContent(false);
  }, []);

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
        <link rel="icon" type="image/png" href="https://weddingbanquets.in/fav-icon/favicon14.png" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//i.ibb.co" />
        <link rel="prefetch" href="https://weddingbanquets.in/logo.png" />
        <meta property="og:site_name" content="Weddingbanquets" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weddingbanquets" />
        <meta name="twitter:image" content="https://weddingbanquets.in/twitter-img.png" />
        {eventManager?.profile_image && (
          <link rel="preload" as="image" href={eventManager.profile_image} />
        )}
      </Head>

      {/* ✅ FIXED: Proper dangerouslySetInnerHTML syntax */}
      {GTM_ID && (
        <>
          <Script
            id="gtm-loader"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          />
          <Script
            id="gtm-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        </>
      )}

      <Layout>
        {loading && <LoadingScreen />}

        <div>
          {chatOpen && (
            <div ref={chatBoxRef} style={chatBoxStyle} aria-live="polite">
              {showContent && (
                <>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={eventManager?.profile_image || "/default-profile.png"}
                        alt={eventManager?.name || "Profile Image"}
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%", marginRight: "10px" }}
                        loading="lazy"
                      />
                      <div>
                        <strong style={{ fontSize: "13px" }}>
                          {eventManager?.name || "Dolly"}
                        </strong>
                        <p style={{ margin: 0, fontSize: "13px" }}>Event Manager</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseChat}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                      aria-label="Close chat"
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <p style={{ margin: 0, fontSize: "11px" }}>
                      Hi! I'm {eventManager?.name || "Dolly"}, your wedding planning assistant!
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=918882198989&text=Hi%20${eventManager?.name || ""}`}
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
                        fontSize: "12px",
                      }}
                    >
                      Chat with {eventManager?.name || "Dolly"}
                    </a>
                  </div>
                </>
              )}
            </div>
          )}

          <div
            onClick={handleWhatsAppClick}
            className="whatsapp-icon"
            style={whatsappFabStyle}
            role="button"
            aria-label="Open WhatsApp chat"
          >
            <Image
              src="https://i.ibb.co/VgSspjY/whatsapp-button.png"
              alt="WhatsApp Icon"
              width={55}
              height={55}
              loading="lazy"
            />
            {notificationCount > 0 && (
              <div style={notifDotStyle} aria-label={`${notificationCount} new message`}>
                {notificationCount}
              </div>
            )}
          </div>
        </div>

        <Component {...pageProps} />
      </Layout>
    </MyContextProvider>
  );
}
