// import styled from "styled-components"
// import { MdCancel } from 'react-icons/md'
// import Image from "next/image"
// import {AiFillCaretDown } from 'react-icons/ai'
// import { useEffect, useState } from "react"
// export default function DiscountCard() {

//     const [showCard,setShowCard] =  useState(false);

//     useEffect(()=>{

//         setTimeout(() => {
//             setShowCard(true);
            
//         }, 10000);

        

//     },[])

//     const hideCard = ()=>{
//         setShowCard(false)
//     }

//     if(showCard){
//         return (
//             <Wrapper show={showCard}>
           
//             <div className="discont-container"  tabIndex="1" >
//                 <MdCancel className="cancel-icon" onClick={hideCard}  />
         
//                 <div className="content">
//                     <Image
//                         src="/common/pricetag.png"
//                         alt="An example image"
//                         width={80}
//                         sizes="(100vw)"
//                         height={80}
//                     />
//                     <h3 className="discount-heading">get upto 40% off</h3>
//                     <p className="discount-text">Share your mobile number to see WeddingBanquet.in prices</p>
//                     <div className="discount-form">
//                         <div className="country-code">
//                             <span>+91</span>
//                             <AiFillCaretDown className="down-icon"/>
//                         </div>
//                         <input type="number"className="phone_input" placeholder="Phone Number" name="phone-number" />
//                     </div>
//                     <button className="discount-btn">SEE PRICES</button>

//                 </div>
//             </div> 
//         </Wrapper>

//         )

//     }
//     else{
//         return null
//     }


// }


// const Wrapper = styled.div`

// position: fixed;
// width: 100vw;
// height: 100vh;
// top: 0px;
// left: 0px;
// right: 0px;
// z-index: 9;
// display: flex;
// justify-content: center ;
// align-items: center;

// .discont-container{
//     transition: all .3s linear;
//     /* transform: scale(1);
//     ${(props) => props.show && '  transform: scale(1)'} */
//     max-width: 40rem;
//     min-width: 40rem;
//     position: relative;
//     /* height: 30rem; */  
//     background-color: white;
//     /* position: fixed; */
//     z-index: 9;
//     /* top: 50%; */
//     /* bottom: 50px; */
//     /* left: 50%; */
//     /* right: 20px; */
//     /* transform: translate(-50%, -50%); */
//     border-radius: 1rem;
//     box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
//     padding: 5rem 2rem;  
//     height: 50rem;
//     .cancel-icon{
//         position: absolute;
//         top: 10px;
//         right: 10px;
//         font-size: 2.5rem;
//         cursor: pointer;
//     }
//     .content{
//         /* border: 1px solid red; */
//         display: flex;
//         align-items: center;
//         flex-direction: column;
//         justify-content: center;
//         gap: 2.5rem;

//         .discount-heading{
           
//             color: var(--primary-color);
//             font-size:3rem;
//             font-family: Montserrat;
//             font-weight: 700;
//             text-transform: capitalize;
        

//         }

//         .discount-text{
//             font-size: 1.6rem;
//             color: var(--para);
//             text-align: center;
//             font-family: "Poppins";

//         }
//         .discount-form{
//             display: flex;
//             width: 100%;
//             border-radius: .3   rem;
//             /* overflow: auto; */
//             border: 2px solid var(--secoundary-color);

//             .country-code{
//                 padding: 10px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 background-color: var(--secoundary-color);

//                 span{
//                     color: white;
//                     font-family: "Poppins";
//                     font-weight: 400;
//                     font-size: 1.8rem;
//                 }
//                 .down-icon{
//                     font-size: 1.7rem;
//                     padding-left: .3rem;
//                     color: white;
//                 }


//             }
//         .phone_input{
//             border: none;
//             outline: none;
//             width: 100%;
//             font-size: 1.8rem;
//             font-family:"Poppins";
//             font-weight: 400;
//             padding: .3px .9rem ;
//         }
//         //Hide the arrow fron the number input
//         input::-webkit-outer-spin-button,
//                 input::-webkit-inner-spin-button {
//                 -webkit-appearance: none;
//                 margin: 0;
//                 }
//     }
//     .discount-btn{
//         background-color: var(--primary-color);
//         white-space: nowrap;
//         color:white;
//         font-size: 2rem;
//         border:none;
//         width: 100%;
//         padding: 1rem 3rem;
//         border-radius: .3rem;
//         cursor: pointer;
//         text-transform: uppercase;
//     }
// }

// }



// `

// // const Wrapper = styled.div`
                                                    
// // `



import styled from "styled-components";
import { MdCancel } from 'react-icons/md';
import Image from "next/image";
import { AiFillCaretDown } from 'react-icons/ai';
import { useEffect, useState } from "react";

export default function DiscountCard() {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const hideCard = () => setShowCard(false);

  if (!showCard) return null;

  return (
    <Wrapper show={showCard}>
      <div className="discont-container" tabIndex={1}>
        <MdCancel className="cancel-icon" onClick={hideCard} aria-label="Close" />
        <div className="content">
          <Image
            src="/common/pricetag.png"
            alt="Discount Tag"
            width={80}
            height={80}
            priority
          />
          <h3 className="discount-heading">get upto 40% off</h3>
          <p className="discount-text">
            Share your mobile number to see WeddingBanquet.in prices
          </p>
          <div className="discount-form">
            <div className="country-code">
              <span>+91</span>
              <AiFillCaretDown className="down-icon" />
            </div>
            <input
              type="number"
              className="phone_input"
              placeholder="Phone Number"
              name="phone-number"
              inputMode="numeric"
            />
          </div>
          <button className="discount-btn">SEE PRICES</button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .discont-container {
    max-width: 40rem;
    min-width: 40rem;
    height: 50rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 0 10px 1000px rgba(0, 0, 0, 0.5);
    padding: 5rem 2rem;
    position: relative;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: ${({ show }) => (show ? "scale(1)" : "scale(0.95)")};
    opacity: ${({ show }) => (show ? 1 : 0)};
    will-change: transform, opacity;

    .cancel-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 2.5rem;
      cursor: pointer;
      touch-action: manipulation;
      padding: 0.5rem;
      border-radius: 50%;
      transition: transform 0.2s ease;
      will-change: transform;

      &:hover,
      &:focus-visible {
        transform: scale(1.1);
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;

      .discount-heading {
        color: var(--primary-color);
        font-size: 3rem;
        font-family: Montserrat;
        font-weight: 700;
        text-transform: capitalize;
      }

      .discount-text {
        font-size: 1.6rem;
        color: var(--para);
        text-align: center;
        font-family: "Poppins";
      }

      .discount-form {
        display: flex;
        width: 100%;
        border-radius: 0.3rem;
        border: 2px solid var(--secoundary-color);
        overflow: hidden;

        .country-code {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--secoundary-color);
          color: white;

          span {
            font-family: "Poppins";
            font-weight: 400;
            font-size: 1.8rem;
          }

          .down-icon {
            font-size: 1.7rem;
            padding-left: 0.3rem;
          }
        }

        .phone_input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 400;
          padding: 0.3rem 0.9rem;
          background-color: white;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }

      .discount-btn {
        background-color: var(--primary-color);
        color: white;
        font-size: 2rem;
        border: none;
        width: 100%;
        padding: 1rem 3rem;
        border-radius: 0.3rem;
        cursor: pointer;
        text-transform: uppercase;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: var(--primary-color-hover, #0056b3);
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }
`;
