import styled from "styled-components";
import Image from "next/image";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script"; 

export default function Hero() {
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
            "logo": "https://www.weddingbanquets.in/logo.webp",
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
                {/* ✅ Fixed logo dimensions to avoid CLS */}
                <Image
                  src="/logo.webp"
                  alt="Wedding Banquets Logo"
                  width={200}
                  height={40}
                  priority // small but above-the-fold → boosts LCP
                />
              </div>
            </Link>

            <h1 className="hero-title">
              TAKE YOUR BUSINESS TO NEXT LEVEL WITH WEDDING BANQUETS 
            </h1>
            <ul className="hero-lists">
              <li className="hero-list">
                Promote your services on our best in business site.
              </li>
              <li className="hero-list">
                Commute to local engaged couples and book more weddings
              </li>
              <li className="hero-list">
                Trusted by over 10,000 professionals. 
              </li>
            </ul>
            <Link href={"/business/signup"}>
              <ButtonDark>Signup</ButtonDark>
            </Link>
          </div>

          <div className="hero-banner">
            {/* ✅ Optimized hero image for LCP */}
            <Image
              src="/business/vendor_hero.png"
              alt="Wedding Banquets Vendor Hero"
              fill
              sizes="100vw"
              priority // 🚀 improves LCP on mobile & desktop
              placeholder="blur"
              blurDataURL="/business/vendor_hero.png" // temporary fallback; can replace with tiny base64 later
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
  }

  .logo-container {
    width: 25rem;
    height: 50px;
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
      gap: .5rem;

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
`;
