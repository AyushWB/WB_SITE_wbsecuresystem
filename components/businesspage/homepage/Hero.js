import styled from "styled-components";
import Image from "next/image";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script"; 
import dynamic from "next/dynamic";
import { useMemo } from "react";


export default function Hero() {
  // Memoize hero lists to reduce re-renders
  const heroLists = useMemo(() => [
    "Promote your services on our best in business site.",
    "Commute to local engaged couples and book more weddings",
    "Trusted by over 10,000 professionals."
  ], []);

  return (
    <>
      <Head>
        <title>
          Connect with WeddingBanquets to grow your wedding business, connect with many individuals, 
          and increase your visibility and clarity in the wedding industry.
        </title>
        <meta
          name="description"
          content="Learn about Wedding Banquets and how it helps you plan weddings and events with top venues vendors like makeup artists, photographers, mehendi artists and more."
        />
        <meta name="robots" content="index, follow" />
        {/* Preload Hero Image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/business/vendor_hero.png"
          imageSrcSet="/business/vendor_hero.png"
          fetchpriority="high"
        />
      </Head>

      <Script
        id="wedding-banquet-schema-businesspage-hero"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wedding Banquets",
            "url": "https://www.weddingbanquets.in",
            "logo": "https://www.weddingbanquets.in/logo.png",
            "sameAs": [
              "https://www.instagram.com/weddingbanquets",
              "https://www.facebook.com/weddingbanquets"
            ],
            "description":
              "Wedding Banquets connects couples with trusted venues and vendors across India. Discover, compare, and book from 50,000+ listings."
          })
        }}
      />

      <Wrapper className="section">
        <div className="hero-container">
          <div className="hero-content">
            <Link href={"/"}>
              <div className="logo-container">
                <Image
                  src="/logo.png"
                  alt="Wedding Banquets Logo"
                  width={200}
                  height={40}
                  priority
                />
              </div>
            </Link>

            <h1 className="hero-title">
              TAKE YOUR BUSINESS TO NEXT LEVEL WITH WEDDING BANQUETS 
            </h1>

            <ul className="hero-lists">
              {heroLists.map((list, index) => (
                <li className="hero-list" key={index}>{list}</li>
              ))}
            </ul>

            <Link href={"/business/signup"}>
              <ButtonDark>Signup</ButtonDark>
            </Link>
          </div>

          <div className="hero-banner">
            <Image
              src="/business/vendor_hero.png"
              alt="Wedding Banquets Vendor Hero"
              fill
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL="/business/vendor_hero.png"
              style={{ objectFit: "cover", aspectRatio: "16/9" }}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  background-color: rgb(239,239,239);

  .hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .logo-container {
    width: 200px;
    height: 40px;
    cursor: pointer;
    position: relative;
  }

  .hero-content {
    padding: 5rem 8rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    max-width: 80rem;

    .hero-title {
      color: var(--primary-color);
      font-size: 3rem;
      font-family: "Montserrat";
      font-weight: 600;
    }

    .hero-lists {
      color: var(--para);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .hero-list {
        list-style: disc !important;
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 400;
      }
    }
  }

  .hero-banner {
    height: 400px;
    position: relative;
  }

  @media (max-width: 1000px) {
    .hero-container {
      grid-template-columns: 1fr;
    }
    .hero-banner {
      height: 300px;
    }
  }

  @media (max-width: 800px) {
    .hero-content {
      padding: 5rem;
    }
  }

  @media (max-width: 550px) {
    .hero-content {
      .hero-title {
        font-size: 2rem;
      }
      .hero-list {
        font-size: 1.5rem;
      }
    }
    .hero-banner {
      height: 250px;
    }
  }
`;