import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import Heading from "@/components/miscellaneous/Heading";
import Head from "next/head";
import { useRouter } from "next/router";

function Faqs({ faqs, name }) {
  const router = useRouter();

  // Check if FAQs data is available before rendering the section
  if (!faqs || faqs.trim() === "") {
    return null; // Do not render the FAQ section if no data is provided
  }

  // Safe JSON parsing with fallback
  let faqs_content = [];
  try {
    faqs_content = JSON.parse(faqs);
  } catch (error) {
    console.error("Invalid FAQ JSON:", error);
    return null; // Do not render the FAQ section if JSON parsing fails
  }

  // Render the FAQ section only if there are valid FAQ items
  if (faqs_content.length === 0) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(null);
  const onItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs_content.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Section className="section faqs-section">
        <div className="container faqs-container">
          <Heading text={`FAQs about ${name}`} />
          {faqs_content.map((item, index) => (
            <Wrapper key={index}>
              <div className="faqs-header" onClick={() => onItemClick(index)}>
                <h3 className="faqs-ques">{item.question}</h3>
                <BsChevronDown
                  className={`icon ${activeIndex === index ? "rotate" : ""}`}
                  size={20}
                />
              </div>
              <div className={`faqs-answer ${activeIndex === index ? "active" : ""}`}>
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </Wrapper>
          ))}
        </div>
      </Section>
    </>
  );
}

const Section = styled.div`
  background-color: var(--bg-color);

  .faqs-container {
    display: grid;
    row-gap: 2rem;
    grid-template-columns: 1fr;
  }
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .faqs-header {
    cursor: pointer;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faqs-ques {
    font-family: Poppins, sans-serif;
    font-weight: 500;
    font-size: 1.8rem;
  }

  .icon {
    transition: all 0.3s linear;
  }

  .rotate {
    transform: rotateX(180deg);
  }

  .faqs-answer {
    display: none;
    padding: 0 1rem;

    &.active {
      display: block;
    }

    p {
      font-size: 1.6rem;
      font-family: Poppins, sans-serif;
      transition: all 0.3s linear;
      margin: 0;
    }

    strong {
      font-weight: 500 !important;
    }
  }
`;

export default Faqs;
