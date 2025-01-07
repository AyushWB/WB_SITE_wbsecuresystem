import { MyContextProvider } from "@/context/MyContext";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import Layout from "@/components/layout.js/Layout";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./loading";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [eventManager, setEventManager] = useState(null); // State to store event manager data
  const chatBoxRef = useRef(null);

  // Fetch event manager data
  useEffect(() => {
    const fetchEventManager = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAINN}/api/get_random_rm`
        );
        const data = await response.json();
        setEventManager(data); // Save fetched event manager data
      } catch (error) {
        console.error("Error fetching event manager:", error);
      }
    };

    fetchEventManager();
  }, []);

  // Loading logic for route changes
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  // Handle automatic chat opening
  useEffect(() => {
    const lastOpened = localStorage.getItem("chatLastOpened");
    const now = new Date().getTime();

    if (!lastOpened || now - parseInt(lastOpened) > 3600000) {
      setChatOpen(true);
      setShowContent(true);
      localStorage.setItem("chatLastOpened", now.toString());

      setTimeout(() => {
        setShowContent(false);
        setChatOpen(false);
      }, 2000);
    }
  }, []);

  // Close chat box when clicking outside
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWhatsAppClick = () => {
    setChatOpen(true);
    setShowContent(true);
    setNotificationCount(0);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setShowContent(false);
  };

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
        <div>
          {chatOpen && (
            <div
              ref={chatBoxRef}
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
                        style={{
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <strong style={{ fontSize: "13px" }}>
                          {eventManager?.name || "Dolly"}
                        </strong>
                        <p style={{ margin: 0, fontSize: "13px" }}>
                          Event Manager
                        </p>
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
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <p style={{ margin: 0, fontSize: "11px" }}>
                      Hi! I'm {eventManager?.name || "Dolly"}, your wedding planning assistant! Let me help you discover the best vendors and venues to make your wedding day perfect.
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
            {notificationCount > 0 && (
              <div
                style={{
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
                }}
              >
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
