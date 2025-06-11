// import styled from "styled-components";
// import { BsChevronDown } from "react-icons/bs";
// import { useState } from "react";
// import Heading from "@/components/miscellaneous/Heading";
// import Head from "next/head";

// function Faqs({ faqs, name }) {
//     const [activeIndex, setActiveIndex] = useState(null);

//     // Safe JSON parsing with fallback
//     let faqs_contant = [];
//     try {
//         faqs_contant = JSON.parse(faqs);
//     } catch (error) {
//         console.error("Invalid JSON in faqs prop", error);
//     }

//     const onItemClick = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     return (
//         <>
//             <Section className="section faqs-section">
//                 <div className="container faqs-container">
//                     <Heading text={`FAQs about ${name}`} />
//                     {faqs_contant?.map((item, index) => (
//                         <Wrapper key={index}>
//                             <div className="faqs-header" onClick={() => onItemClick(index)}>
//                                 <h3 className="faqs-ques">{item.question}</h3>
//                                 <BsChevronDown
//                                     className={`icon ${activeIndex === index ? "rotate" : ""}`}
//                                     size={20}
//                                 />
//                             </div>
//                             <ul className={`list-unstyled ${activeIndex === index ? "active" : ""}`}>
//                                 <li>
//                                     <p dangerouslySetInnerHTML={{ __html: `${item.answer}` }}></p>
//                                 </li>
//                             </ul>
//                         </Wrapper>
//                     ))}
//                 </div>
//             </Section>
//         </>
//     );
// }

// const Section = styled.div`
//   background-color: var(--bg-color);

//   .faqs-container {
//     display: grid;
//     row-gap: 2rem;
//     grid-template-columns: repeat(1, 1fr);
//   }
// `;

// const Wrapper = styled.div`
//   background-color: white;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;

//   .active {
//     display: block;
//   }

//   .faqs-header {
//     cursor: pointer;
//     padding: 1rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .icon {
//     display: block;
//     transition: all 0.3s linear;
//   }

//   .rotate {
//     transform: rotateX(180deg);
//   }

//   .faqs-ques {
//     font-family: Poppins;
//     font-weight: 500;
//     font-size: 1.8rem;
//   }

//   ul {
//     display: none;
//     flex-direction: column;
//     gap: 1rem;

//     &.active {
//       display: flex;
//     }

//     li {
//       list-style: none;
//     }

//     p {
//       font-size: 1.6rem;
//       font-family: Poppins;
//       transition: all 0.3s linear;
//       padding: 1rem;
//     }

//     strong {
//       font-weight: 500 !important;
//     }
//   }
// `;

// export default Faqs;



import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import Heading from "@/components/miscellaneous/Heading";
import Head from "next/head";

function Faqs({ faqs, name }) {
    const [activeIndex, setActiveIndex] = useState(null);

    // Check if FAQs data is available before rendering the section
    if (!faqs || faqs.trim() === "") {
        return null; // Do not render the FAQ section if no data is provided
    }

    // Safe JSON parsing with fallback
    let faqs_contant = [];
    try {
        faqs_contant = JSON.parse(faqs);
    } catch (error) {
        console.error("Invalid JSON in faqs prop", error);
        return null; // Do not render the FAQ section if JSON parsing fails
    }

    // Render the FAQ section only if there are valid FAQ items
    if (faqs_contant.length === 0) {
        return null;
    }

    const onItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <Section className="section faqs-section">
                <div className="container faqs-container">
                    <Heading text={`FAQs about ${name}`} />
                    {faqs_contant?.map((item, index) => (
                        <Wrapper key={index}>
                            <div className="faqs-header" onClick={() => onItemClick(index)}>
                                <h3 className="faqs-ques">{item.question}</h3>
                                <BsChevronDown
                                    className={`icon ${activeIndex === index ? "rotate" : ""}`}
                                    size={20}
                                />
                            </div>
                            <ul className={`list-unstyled ${activeIndex === index ? "active" : ""}`}>
                                <li>
                                    <p dangerouslySetInnerHTML={{ __html: `${item.answer}` }}></p>
                                </li>
                            </ul>
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
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .active {
    display: block;
  }

  .faqs-header {
    cursor: pointer;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    display: block;
    transition: all 0.3s linear;
  }

  .rotate {
    transform: rotateX(180deg);
  }

  .faqs-ques {
    font-family: Poppins;
    font-weight: 500;
    font-size: 1.8rem;
  }

  ul {
    display: none;
    flex-direction: column;
    gap: 1rem;

    &.active {
      display: flex;
    }

    li {
      list-style: none;
    }

    p {
      font-size: 1.6rem;
      font-family: Poppins;
      transition: all 0.3s linear;
      padding: 1rem;
    }

    strong {
      font-weight: 500 !important;
    }
  }
`;

export default Faqs;
