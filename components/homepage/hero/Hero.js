import styled from "styled-components";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState, useMemo } from "react";

const Offer = dynamic(() => import("@/components/miscellaneous/Offer"), {
  ssr: false,
  loading: () => null,
});

import SearchBar3 from "@/components/miscellaneous/SearchBar3";

function Hero() {
  const { venue_list, vendor_list, vendorCategories, selectedCity, venueCategories } =
    useGlobalContext();

  const [backgroundImage, setBackgroundImage] = useState("/banner/delhi.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const memoizedData = useMemo(() => {
    const venueNames = venueCategories.map((c) => c.name);
    const vendorNames = vendorCategories.map((c) => c.name);
    const vendorBrandNames = vendor_list.map((c) => c.brand_name);
    const allVenues = venue_list.map((c) => c.name);
    const allVenuesSlug = venue_list.map((c) => c.slug);
    const allVendorsSlug = vendor_list.map((c) => c.slug);

    const suggestions = [...venueNames, ...vendorNames, ...vendorBrandNames, ...allVenues];

    const venueObject = allVenues.map((v, i) => ({ [v]: allVenuesSlug[i] }));
    const vendorObject = vendorBrandNames.map((v, i) => ({ [v]: allVendorsSlug[i] }));

    return {
      venueObject,
      vendorObject,
      suggestions,
      vendorBrandNames,
      allVenues,
      allVenuesSlug,
    };
  }, [venueCategories, vendorCategories, vendor_list, venue_list]);

  useEffect(() => {
    const path = `/banner/${selectedCity?.toLowerCase?.() || "delhi"}.jpg`;
    if (typeof window !== "undefined") {
      const preload = new window.Image();
      preload.src = path;
      preload.onload = () => setBackgroundImage(path);
    }
  }, [selectedCity]);

  return (
    <Section aria-label="Hero Section">
      <div className="hero-container">
        <Image
          src={backgroundImage}
          alt="Wedding Banquets, Banquet halls, Wedding Venues"
          fill
          priority
          quality={65}
          fetchPriority="high"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wCEAA...==" // placeholder trimmed
          sizes="100vw"
          style={{
            opacity: isImageLoaded ? 1 : 0.25,
            transition: "opacity 0.5s ease-out",
            willChange: "opacity",
          }}
          onLoadingComplete={() => setIsImageLoaded(true)}
        />

        <div className="overlay" />

        <div className="hero-title-container">
          <h1 className="title">
            Find The Perfect Wedding Banquet <br />
            Hall For Your Dream Day!
          </h1>
          <p className="description">
            Explore over 50,000+ Venues and Vendors with reviews, pricing and more.
          </p>
        </div>

        <SearchBar3
          suggestions={memoizedData.suggestions}
          selectedCity={selectedCity}
          vendorBrandNames={memoizedData.vendorBrandNames}
          allVenues={memoizedData.allVenues}
          allVenuesSlug={memoizedData.allVenuesSlug}
          venueObject={memoizedData.venueObject}
          vendorObject={memoizedData.vendorObject}
        />
      </div>

      <Offer />
    </Section>
  );
}

export default Hero;

const Section = styled.section`
  width: 100%;
  height: auto;

  .hero-container {
    position: relative;
    width: 100%;
    height: 85vh;
    overflow: visible;
    background: #000;

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 0%,
        rgba(0, 0, 0, 0.15) 100%
      );
      will-change: opacity;
      transition: opacity 0.3s ease-out;
      z-index: 1;
    }

    .hero-title-container {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 2;
      width: 90%;
      max-width: 700px;
      backface-visibility: hidden;
      will-change: transform, opacity;

      h1 {
        color: #fff;
        font-size: 4rem;
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 0.8rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      }

      p {
        color: #fff;
        font-size: 2rem;
        font-weight: 500;
        opacity: 0.95;
        margin-top: 1rem;
        font-family: "Montserrat";
      }
    }
  }

  @media (max-width: 800px) {
    .hero-container {
      height: 450px;
    }
  }

  @media (max-width: 550px) {
    .hero-container {
      height: 360px;
    }

    .hero-title-container {
      h1 {
        font-size: 2.5rem !important;
        line-height: 1.3;
      }

      p {
        font-size: 1.8rem !important;
      }
    }
  }
`;
