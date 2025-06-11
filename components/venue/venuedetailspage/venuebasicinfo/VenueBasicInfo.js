import styled from "styled-components";
import PriceListCard from "./PriceListCard";
import DemandCard from "@/components/miscellaneous/DemandCard";
import DiscountCard from "./DiscountCard";
import { useState } from "react";
import Head from "next/head";
import AreaCapacity from "./AreaCapacity";

export default function VenueBasicInfo({ venue, openLeadsModel, openAvailableCheck, id }) {
    const [showSummary, setShowSumary] = useState(false);

    // Define the schema data for Raas Banquet Moti Nagar
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Raas Banquet Moti Nagar",
        "image": "https://cms.weddingbanquets.in/storage/uploads/venue_raas__1719918284.webp",
        "url": "https://weddingbanquets.in/delhi/raas-banquet-moti-nagar",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "15 A, Najafgarh road industrial area,shivaji marg, CHOWK, near ZAKHIRA, New Delhi, Delhi 110015",
            "addressLocality": "New Delhi, Delhi NCR",
            "addressRegion": "Delhi NCR",
            "postalCode": "110015",
            "addressCountry": "India"
        },
        "telephone": "+91-7969071909",
        "priceRange": "₹1200 - 1500",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "100"
        }
    };

    return (
        <Section className="section section-venue-basic-info">
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaData),
                    }}
                />
            </Head>

            <div className="basic-venue-info-container">
                <div className="basic-venue-info-content">
                    <div className="venue-details">
                        <h1 className="basic-venue-info-name">{venue.name || ""}</h1>
                        <p className="basic-venue-info-address">{venue.venue_address || " "}</p>
                    </div>
                    <div className="price-details-card">
                        <PriceListCard
                            min_capacity={venue.min_capacity}
                            max_capacity={venue.max_capacity}
                            nonveg_price={venue.nonveg_price}
                            veg_price={venue.veg_price}
                            phone={venue.phone}
                            slug={venue.slug}
                            id={id}
                            openLeadsModel={openLeadsModel}
                        />
                    </div>
                    <div className="about">
                    <div className="about-title">
                        About
                    </div>
                        <div
                            className="about-desSc"
                            dangerouslySetInnerHTML={{
                                __html: showSummary ? venue.summary || "" : venue.summary ? venue.summary.slice(0, 500) : "",
                            }}
                        ></div>
                        <span className="read-more-btn" onClick={() => setShowSumary(!showSummary)}>
                            {showSummary ? "Read less" : "Read more"}
                        </span>
                    </div>
                    <div className="cards">
                        <AreaCapacity venue={venue} openAvailableCheck={openAvailableCheck} />
                        <DemandCard />
                        <DiscountCard openLeadsModel={openLeadsModel} />
                    </div>
                </div>
                <div className="venue-price-list">
                    <PriceListCard
                        min_capacity={venue.min_capacity}
                        max_capacity={venue.max_capacity}
                        nonveg_price={venue.nonveg_price}
                        veg_price={venue.veg_price}
                        phone={venue.phone}
                        slug={venue.slug}
                        openLeadsModel={openLeadsModel}
                    />
                </div>
            </div>
        </Section>
    );
}

const Section = styled.section`
    padding: 1rem 0rem !important;
    background-color: var(--bg-color);

    .basic-venue-info-container {
        margin: auto;
        display: grid;
        grid-template-columns: 7fr 3fr;
        gap: 5rem;
    }

    .about-desSc {
        font-family: "Poppins" !important;
        font-size: 1.6rem !important;
        line-height: 1.6;
        color: var(--para) !important;

        /* List styling */
        ul, ol {
            padding-left: 2rem;
            margin: 1rem 0;
        }

        ul li {
            list-style-type: disc !important;
            margin-bottom: 0.5rem;
            font-size: 1.6rem !important;
            line-height: 1.6;
        }

        ol li {
            list-style-type: decimal !important;
            margin-bottom: 0.5rem;
            font-size: 1.6rem !important;
            line-height: 1.6;
        }

        /* Heading styles */
        h1, h2, h3, h4, h5, h6 {
            margin: 1.5rem 0 1rem;
            color: var(--primary-color);
            font-weight: 600;
        }

        h1 {
            font-size: 2.4rem !important;
        }

        h2 {
            font-size: 2.2rem !important;
        }

        h3 {
            font-size: 2rem !important;
        }

        h4 {
            font-size: 1.8rem !important;
        }

        /* Paragraph styling */
        p {
            margin-bottom: 1rem;
            font-size: 1.6rem !important;
            line-height: 1.6;
        }

        /* Table styling */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }

        th, td {
            border: 1px solid #ececec;
            padding: 0.8rem;
            font-size: 1.6rem;
        }

        th {
            background-color: #f8f8f8;
            font-weight: 600;
        }

        /* Image styling */
        img {
            max-width: 100%;
            height: auto;
            margin: 1rem 0;
        }

        /* Blockquote styling */
        blockquote {
            border-left: 4px solid var(--primary-color);
            margin: 1rem 0;
            padding: 1rem 2rem;
            background-color: #f8f8f8;
            font-style: italic;
        }

        /* Link styling */
        a {
            color: var(--info-color);
            text-decoration: underline;
            
            &:hover {
                color: var(--primary-color);
            }
        }
    }

    .basic-venue-info-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .venue-details {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            padding: 1rem 1.5rem;

            .basic-venue-info-name {
                font-family: "Montserrat";
                font-size: 2.5rem;
                color: var(--primary-color);
                font-weight: 700;
            }

            .basic-venue-info-address {
                font-family: "Poppins";
                font-size: 1.7rem;
                color: var(--primary-color);
                font-weight: 400;
            }
        }

        .price-details-card {
            display: none;
        }

        .about {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 1.5rem;

            .about-title {
                font-family: "Montserrat";
                font-size: 2.5rem;
                color: var(--primary-color);
                font-weight: 700;
            }
            .about-desc,
            .about p,
            .about span,
            .about div:not(.about-title) {
                font-family: "Poppins" !important;
                font-size: 1.8rem !important;
                color: var(--para);
                text-align: justify;
                line-height: 2;
                font-weight: 400;
            }
            .read-more-btn {
                font-family: "Poppins" !important;
                font-size: 1.8rem !important;
                font-weight: 400;
                color: var(--info-color);
                cursor: pointer;
            }
        }

        .cards {
            display: flex;
            gap: 2rem;
            flex-direction: column;
            padding: 1rem 1.5rem;
        }
    }

    @media (max-width: 700px) {
        .basic-venue-info-container {
            grid-template-columns: 1fr;
        }
        .venue-price-list {
            display: none;
        }
        .price-details-card {
            display: block !important;
        }
    }
`;
