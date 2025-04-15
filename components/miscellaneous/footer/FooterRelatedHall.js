// import React from 'react';
// import styled from 'styled-components';
// import Link from 'next/link';

// const formatName = (name) => {
//   return name
//     ?.replace(/-/g, ' ')
//     ?.replace(/\b\w/g, (char) => char.toUpperCase()) || '';
// };

// function FooterRelatedHall({ city, locality }) {
//   const displayName = formatName(locality === 'all' ? city : locality);

//   const venue_categoriesHall = [
//     {
//       id: 25,
//       name: 'Rajori Garden',
//       slug: 'banquet-halls',
//     },
//     {
//         id: 26,
//         name: 'Karol Bagh',
//         slug: 'karol-bagh',
//       },
//       {
//         id: 27,
//         name: 'Naraina',
//         slug: 'banquet-halls',
//       },
//       {
//         id: 28,
//         name: 'Rama Road',
//         slug: 'banquet-halls',
//       },
//       {
//         id: 29,
//         name: 'Hari nagar',
//         slug: 'banquet-halls',
//       },
//   ];

//   return (
//     <Section className="section-vendors">
//       <div className="container">
//         <h2 className="vendors-heading">
//           Other Banquets hall near by {displayName}
//         </h2>
//         <div className="vendors-container">
//           <div className="vendors-list">
//             {venue_categoriesHall.map((cat) => (
//               <Link
//                 key={cat.id} className="vendor-link"
//                 href={`/${cat.slug}/${city}/${locality}`}
//               >
//                 {`Banquets Hall in ${cat.name}`}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

// const Section = styled.section`
//   margin-top: 2rem;

//   .vendors-heading {
//     font-size: 2rem;
//     letter-spacing: 1px;
//   }

//   .vendors-container {
//     padding: 1rem 0rem;

//     .vendors-list {
//       padding: 2rem 0rem;

//       .vendor-link {
//         line-height: 3rem;
//         font-family: 'Poppins';
//         margin-bottom: 10px;
//         font-size: 1.5rem;
//         cursor: pointer;
//         transition: all 0.3s linear;
//         color: var(--para);
//         white-space: normal;
//         overflow-wrap: break-word;
//         display: inline-block;

//         &:hover {
//           color: red;
//         }

//         &::after {
//           content: '|';
//           padding: 0 10px;
//           opacity: 0.54;
//           color: black;
//         }

//         &:last-child::after {
//           content: '';
//         }
//       }
//     }
//   }
// `;

// export default FooterRelatedHall;


