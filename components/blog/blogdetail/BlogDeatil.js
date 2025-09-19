import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import FetureImg from "./description/FetureImg";
import PopularPost from "./sidebar/PopularPost";
import LatestPost from "./sidebar/LatestPost";
import Ad from "./sidebar/Ad";
import AuthorCard from "./authorcard/AuthorCard";
import Faqs from "@/components/blog/blogdetail/faqs/Faqs";

const BlogDetail = ({ data }) => {
  const blog = data.data;
  const popular = data.popular;
  const latest = data.latest;
  const author = data.author;

  const [tocItems, setTocItems] = useState([]);
  const [isTocVisible, setIsTocVisible] = useState(false);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const buildNestedToc = (headings) => {
    const nested = [];
    const stack = [{ level: 0, children: nested }];

    headings.forEach((heading) => {
      const level = parseInt(heading.level[1], 10);
      const node = { ...heading, children: [] };

      while (level <= stack[stack.length - 1].level) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    return nested;
  };

  const renderTocList = (items) => {
    const flattenItems = (nodes) =>
      nodes.reduce((acc, item) => {
        acc.push(item);
        if (item.children.length > 0) {
          acc = acc.concat(flattenItems(item.children));
        }
        return acc;
      }, []);

    const flatList = flattenItems(items);

    return (
      <ul className="toc-flat-list">
        {flatList.map((item) => {
          const symbol = item.level === "h2" ? "✍️" : item.level === "h3" ? "🔹" : "•";
          return (
            <li key={item.id} className="toc-item" data-symbol={symbol}>
              <a href={`#${item.id}`} title={item.text}>
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = blog.summary;

      const headingsRaw = Array.from(
        tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")
      );

      const usedIds = new Map();

      const headings = headingsRaw.map((heading) => {
        let baseId = slugify(heading.textContent);
        let uniqueId = baseId;
        let counter = 1;

        while (usedIds.has(uniqueId)) {
          uniqueId = `${baseId}-${counter++}`;
        }
        usedIds.set(uniqueId, true);

        heading.id = uniqueId;
        return {
          id: uniqueId,
          text: heading.textContent,
          level: heading.tagName.toLowerCase(),
        };
      });

      blog.summary = tempDiv.innerHTML;
      setTocItems(buildNestedToc(headings));
    }
  }, [blog.summary]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.heading,
    description: blog.meta_description,
    datePublished: `${blog.publish_date}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog.slug,
    },
    image: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${blog.image}`,
      width: 823,
      height: 548,
    },
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "www.weddingbanquets.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.weddingbanquets.in/logo.webp",
        width: 280,
        height: 60,
      },
    },
  };

  return (
    <Wrapper>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Container>
        <Description>
          <Heading>{blog.heading}</Heading>
          <FetureImg image={blog.image} image_alt={blog.image_alt} />

          {tocItems.length > 0 && (
            <TOCWrapperMobile>
              <MobileTocHeader onClick={() => setIsTocVisible(!isTocVisible)}>
                <span className="hamburger">&#9776;</span>
                <h3>Table of Contents</h3>
              </MobileTocHeader>
              {isTocVisible && renderTocList(tocItems)}
            </TOCWrapperMobile>
          )}

          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: blog.summary }}
          />
            <Faqs faqs={blog?.faq} name={blog?.heading} />
          <AuthorCard {...author} />
        </Description>

        <RightSidebar>
          <PopularPost popular={popular} />
          {tocItems.length > 0 && (
            <TOCWrapperDesktop>
              <DesktopTocHeader onClick={() => setIsTocVisible(!isTocVisible)}>
                <span className="hamburger">&#9776;</span>
                <h3>Table of Contents</h3>
              </DesktopTocHeader>
              {isTocVisible && renderTocList(tocItems)}
            </TOCWrapperDesktop>
          )}
          <LatestPost latest={latest} />
          <Ad />
        </RightSidebar>
      </Container>
    </Wrapper>
  );
};

export default BlogDetail;


// STYLED COMPONENTS

const Wrapper = styled.div`
  background: var(--bg-color);
`;

const Container = styled.div`
  padding: 2rem 0;
  margin: 0 3rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
  }
`;

const Description = styled.div`
  margin-top: 10rem;
  line-height: 1.6;

  p,
  span {
    font-family: "Poppins" !important;
    font-size: 1.8rem !important;
    color: var(--para) !important;
  }

  h1 {
    font-size: 32px !important;
  }

  h2 {
    font-size: 28px !important;
  }

  h3 {
    font-size: 24px !important;
  }

  @media (max-width: 768px) {
    margin-top: 6rem;
  }
`;

const RightSidebar = styled.aside`
  padding: 1rem;
  margin-top: 10rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Heading = styled.h1`
  margin: 1rem;
  font-size: 4rem;
  text-align: center;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;


const TOCWrapper = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  box-shadow: 0 8px 4px rgba(0, 0, 0, 0.06);
  font-family: "Poppins", sans-serif;

  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: var(--primary-color, #1a3ea8);
    border-bottom: 1px solid #1a3ea8;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h3::before {
    content: "📑";
    font-size: 2rem;
  }

  .toc-flat-list {
    list-style: none;
    padding-left: 0;
    margin: 0;

    max-height: 300px; 
    overflow-y: auto;  

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color:#d4af37;
      border-radius: 3px;
    }
  }

  .toc-flat-list li {
    margin-bottom: 1.2rem;
    position: relative;
    padding-left: 2.5rem;
  }

  .toc-flat-list li::before {
    content: attr(data-symbol);
    position: absolute;
    left: 0;
    top: -0.1rem;
    font-size: 1.8rem;
    color: #1a3ea8;
  }

  .toc-flat-list li a {
    font-size: 1.8rem;
    font-weight: 500;
    color: #003366;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
    line-height: 1.4;
  }

  .toc-flat-list li a:hover {
    color: #0056b3;
    text-decoration: underline;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    max-height: none;
  }
`;
const TOCWrapperMobile = styled(TOCWrapper)`
  display: none;

   @media (max-width: 768px) {
    display: block;
    max-height: none;   
    overflow-y: unset;         
    border-radius: 16px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
    }
  }
`;

const TOCWrapperDesktop = styled(TOCWrapper)`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileTocHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  margin-bottom: 1.2rem;
  border-bottom: 2px solid #1a3ea8;
  top: 0;
  z-index: 10;

  .hamburger {
    font-size: 2.4rem;
    color: var(--primary-color, #1a3ea8);
    user-select: none;
  }

  h3 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-color, #1a3ea8);
    border: none;
    padding: 0;
  }
`;

const DesktopTocHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  border-bottom: 2px solid #1a3ea8;

  .hamburger {
    font-size: 2rem;
    color: var(--primary-color, #1a3ea8);
    user-select: none;
  }

  h3 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color, #1a3ea8);
    border: none;
    padding: 0;
  }
`;