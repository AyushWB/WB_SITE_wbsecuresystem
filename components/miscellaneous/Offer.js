import styled from "styled-components";
import React, { memo } from "react";

const Section = styled.div`
  background: var(--primary-color);
  color: white;
  overflow: hidden;
  contain: layout paint;

  .main-offer {
    padding: 0.5rem 1rem;
    font-family: "Poppins";
    font-size: 1.8rem;
    white-space: nowrap;
    animation: scroll-left 25s linear infinite;
  }

  @keyframes scroll-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

function Offer() {
  return (
    <Section>
      <div className="container">
        <div className="main-offer">
          Get Up to 40% Discount On All Our Services | Guaranteed Unbeatable Prices!
        </div>
      </div>
    </Section>
  );
}

export default memo(Offer);
