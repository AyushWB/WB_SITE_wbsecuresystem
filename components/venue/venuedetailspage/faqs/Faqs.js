// import styled from "styled-components";
// import { BsChevronDown } from 'react-icons/bs'
// import { useState } from 'react';
// import Heading from "@/components/miscellaneous/Heading";
// import Head from "next/head";


// function Faqs({ faqs, name }) {
//     const faqs_contant = JSON.parse(faqs);
//     const [activeIndex, setActiveIndex] = useState(null);
//     const onItemClick = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     const faqs_content = faqs_contant ? faqs_contant : [];

//     const faqSchema = {
//         "@context": "https://schema.org",
//         "@type": "FAQPage",
//         "mainEntity": faqs_content.map(faq => ({
//             "@type": "Question",
//             "name": faq.question,
//             "acceptedAnswer": {
//                 "@type": "Answer",
//                 "text": faq.answer
//             }
//         }))
//     };

//     return (
//         <>
//             <Head>
//                 <script
//                     type="application/ld+json"
//                     dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//                 />

//             </Head>
//             <Section className="section faqs-section"  >
//                 <div className="container faqs-container">
//                     <Heading text={`FAQs about ${name}`} />
//                     {
//                         faqs_contant?.map((item, index) => {
//                             return (
//                                 <Wrapper key={index}>
//                                     <div className='faqs-header' onClick={() => { onItemClick(index) }}>
//                                         <h3 className='faqs-ques'>{item.question}</h3>
//                                         <BsChevronDown className={`icon ${activeIndex === index ? 'rotate' : ''}`} size={20} />
//                                     </div>
//                                     <ul className={`list-unstyled ${activeIndex === index ? 'active' : ''} `}>
//                                         <p dangerouslySetInnerHTML={{__html: `${item.answer}`}}></p>
//                                     </ul>
//                                 </Wrapper>
//                             )
//                         })
//                     }
//                 </div>
//             </Section>
//         </>


//     )
// }

// const Section = styled.div`
// background-color: var(--bg-color);
// /* max-width: 60rem; */
// /* margin: auto; */

// .faqs-container{
//     display: grid;
//     row-gap: 2rem;
//     grid-template-columns: repeat(1,1fr);
// }
// `;

// const Wrapper = styled.div`
//     background-color: white;
//     padding: 1rem;
//     display: flex;  
//     flex-direction: column;
//     gap: 1.5rem;
    
//     .active{
//         display: block;
//     }
//     .faqs-header{
//         cursor: pointer;
        

//         .rotate{
//             transform: rotateX(180deg)
            
//         }
//         /* border: 1px solid var(--primary-color); */
//         padding: 1rem;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .icon{
//         display: block;
//         transition: all .3s linear;
//         /* ${(props) => props.show ? '  transform: rotateX(180deg)' : ' transform: rotate(0deg)'} */
//     }
    
//     .faqs-ques{
//         font-family: Poppins;
//         font-weight: 500;
//         font-size: 1.8rem;
//     }
//     .venue-title{
//         font-size: 1.5rem;
//     }
//     ul{
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//         /* display: ${(props) => props.show ? "block" : 'none'}; */
//         display: none;
        
//         p{
//             font-size: 1.6rem;
//             font-family: Poppins;
//             transition: all .3s linear;
//             padding: 1rem;

//         }
//             strong{
//             font-weight: 500 !important;
//             }
//     }

    
        



// `
// export default Faqs;



import styled from "styled-components";
import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';
import Heading from "@/components/miscellaneous/Heading";
import Head from "next/head";
import { useRouter } from "next/router";

function Faqs({ faqs, name }) {
    const router = useRouter();
    const faqs_contant = JSON.parse(faqs);
    const [activeIndex, setActiveIndex] = useState(null);
    const onItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs_content = faqs_contant || [];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs_content.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    const isFaqSchemaAllowed = router.asPath !== "/delhi/raas-banquet-moti-nagar";

    return (
        <>
            <Head>
                {isFaqSchemaAllowed && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )}
            </Head>

            <Section className="section faqs-section">
                <div className="container faqs-container">
                    <Heading text={`FAQs about ${name}`} />
                    {faqs_contant?.map((item, index) => (
                        <Wrapper key={index}>
                            <div className='faqs-header' onClick={() => onItemClick(index)}>
                                <h3 className='faqs-ques'>{item.question}</h3>
                                <BsChevronDown className={`icon ${activeIndex === index ? 'rotate' : ''}`} size={20} />
                            </div>
                            <ul className={`list-unstyled ${activeIndex === index ? 'active' : ''}`}>
                                <p dangerouslySetInnerHTML={{ __html: `${item.answer}` }}></p>
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
