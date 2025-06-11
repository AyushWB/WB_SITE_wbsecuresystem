import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

function FooterLocalities({ city, category, localities }) {
  const category_name = category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const [showMore, setShowMore] = useState(false);


  return (
    <Section className="section-vendors">
      <div className="container">
        <h2 className="vendors-heading">
          Other {category_name} near by{" "}
          <span className="city-name">{city}</span>
        </h2>
        <div className="vendors-container">
        <div className="vendors-list">
            {(showMore ? localities : localities?.slice(0, 20))?.map((locality) => (
              <span key={locality.id}>
                <Link
                  className="vendor-link"
                  href={`/${category}/${city}/${locality.slug}`}
                >
                  {`${category_name} in ${locality.name}`}  
                </Link>
              </span>
            ))}
          </div>
          <span
            className="read-more-btn"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {" "}
            {showMore ? "Read less" : "Read more"}
          </span>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  .vendors-heading {
    font-size: 2rem;
    letter-spacing: 1px;

    .city-name {
      text-transform: capitalize;
    }
  }
  .vendors-container {
    padding: 1rem 0rem;
    .read-more-btn {
      font-family: "Poppins" !important;
      font-size: 1.8rem !important;
      font-weight: 400;
      color: var(--info-color);
      cursor: pointer;
    }
    .vendors-list {
      padding: 2rem 0rem;

      span:not(:last-child)::after {
        content: "|";
        padding: 0 10px;
        opacity: .54;
        color: black;
        font-size: 1.5rem;
  }

      .vendor-link {
        line-height: 3rem;
        font-family: "Poppins";
        margin-bottom: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s linear;
        color: var(--para);
        white-space: normal;
        overflow-wrap: break-word;

        &:hover {
          color: red;
        }
      }
    }
  }
`;

export default FooterLocalities;