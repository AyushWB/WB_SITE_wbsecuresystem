import styled from "styled-components";
import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BiRupee } from "react-icons/bi";
import RatingCardDynamic from "@/components/miscellaneous/RatingCardDynamic";
import Assured from "@/components/miscellaneous/Assured";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import { useRouter } from "next/router";
import { memo } from "react";
import PropTypes from "prop-types";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";

function VendorCard({ vendor, openLeadModel, city, category, locality, callConversion }) {
  const image = vendor?.images?.split(",")[0];
  const router = useRouter();

  const handleAnchorClick = async (e, slug) => {
    e.stopPropagation();
    await CallingRequest(slug);
  };
  return (
    <Wrapper>
      <div className="card-items">
        <div className="banner">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
            alt="Vendor image"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onClick={() => router.push(`/${city}/${vendor.slug}`)}
          />
          {vendor?.wb_assured && <Assured />}
          <div className="rate">
            <RatingCardDynamic
              rating={vendor?.place_rating}
              ratingcount={vendor?.reviews_count}
              slug={vendor.slug}
            />
          </div>
        </div>
        <div onClick={() => router.push(`/${city}/${vendor.slug}`)}>
          <div className="name-city">
            <h3 className="vendor-name">{vendor?.brand_name}</h3>
            <p className="vendor-city">{vendor?.vendor_address?.slice(0, 40)}...</p>
          </div>

          <div className="price-bar">
          <MdOutlinePriceChange className="icon" />
            <p className="package-title">Package Price</p>
            <p className="package-price">
              <BiRupee />
              <del>{vendor?.package_price}</del>
            </p>
          </div>

          <div className="vendor-aditional-info">
                <div className="detail-circle">
                  <BsFillSuitcaseLgFill className="icon" />
                  <p>
                    Exp.{" "}
                    {`${vendor?.yrs_exp !== undefined &&
                      vendor?.yrs_exp !== null &&
                      vendor?.yrs_exp !== 0
                      ? vendor.yrs_exp
                      : "5+"
                      } Yr's`}
                  </p>
                </div>
                <div className="detail-circle">
                  <MdEventAvailable className="icon" />
                  <p>
                    Event Completed:
                    <span className="price">
                      &nbsp;
                      {`${vendor?.event_completed !== undefined &&
                        vendor?.event_completed !== null &&
                        vendor?.event_completed !== 0
                        ? vendor.event_completed
                        : 150
                        }+`}
                    </span>
                  </p>
                </div>
              </div>

          <div className="action-btns">
            <button
              className="vendor-card-btn"
              onClick={(e) => {
                openLeadModel(e, vendor.slug, vendor.id);
                e.stopPropagation();
              }}
            >
              Get Quotation
            </button>

            <span className="call-btn">
              <a
                href={`tel:0${vendor.phone}`}
                onClick={(e) => {
                  handleAnchorClick(e, vendor.slug);
                }}
                aria-label="call icon"
              >
                <BiSolidPhoneCall className="call-icon" size={30} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

VendorCard.propTypes = {
  vendor: PropTypes.object.isRequired,
  openLeadModel: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
  callConversion: PropTypes.func.isRequired,
};

export default memo(VendorCard);

// STYLED COMPONENT
const Wrapper = styled.div`
  min-width: 250px;
  background-color: white;
  border-radius: 1.2rem;
  cursor: pointer;
  overflow: hidden;

  .card-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .banner {
    position: relative;
    height: 200px;

    .rate {
      position: absolute;
      z-index: 1;
      bottom: 10px;
      right: 10px;
    }
  }

  .name-city {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .vendor-name {
      font-family: "Poppins";
      font-size: 2rem;
      color: var(--primary-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .vendor-city {
      font-size: 1.5rem;
      color: var(--primary-color);
      font-family: "Poppins";
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .price-bar {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #333;
     .icon {
        color: var(--para);
        font-size: 2.2rem;
      }

    .package-title{
      color: var(--para);
      font-family: Poppins;
      font-size: 1.5rem;
    }

    .package-price {
      display: flex;
      align-items: center;
      font-family: Poppins;
      font-weight: bold;
      color: black;
      font-size: 1.5rem;  
    }
  }
    .vendor-aditional-info {
    margin-top: 10px;
    .location {
      margin: 0 20px 0 0;
      p,
      .icon {
        color: var(--info-color);
      }
    }
    .detail-circle {
      display: flex;
      gap: 3px;
      align-items: center;
      padding: 3px 7px;
      border-radius: 5px;
      color: var(--para);
      margin-right: 20px;
      margin-top:5px;
      .icon {
        font-size: 2.2rem;
      }
      p {
        font-family: "Poppins";
        font-size: 1.5rem;
      }
        span{
        font-family: Poppins;
        font-weight: bold;
        color: black;
        font-size: 1.5rem;
        margin-left: 200px;
        }
    }
  }

  .action-btns {
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .vendor-card-btn {
      white-space: nowrap;
      background: none rgb(243, 50, 50);
      border: 1px solid white;
      color: white;
      padding: 1rem 2.5rem;
      text-transform: uppercase;
      border-radius: 0.5rem;
      font-size: 1.8rem;
      cursor: pointer;
      transition: 0.3s linear;

      &:hover {
        background-color: var(--primary-color);
      }
    }

   .call-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--phone);
      padding: 0rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s linear;
      

  .call-icon {
    color: var(--phone);
  }

  &:hover {
    background-color: var(--phone);

    .call-icon {
      color: white;
    }
  }
}
  @media (max-width: 768px) {
    .banner {
      height: 180px;
    }

    .name-city {
      .vendor-name {
        font-size: 1.8rem;
      }

      .vendor-city {
        font-size: 1.4rem;
      }
    }

    .action-btns {
      padding: 1rem;

      .vendor-card-btn {
        padding: 0.7rem 2rem;
        font-size: 1.4rem;
      }
    }
  }
`;

// import Image from "next/image";
// import styled from "styled-components";
// import { IoIosCall, IoLogoWhatsapp } from "react-icons/io";
// import { MdOutlineWhatsapp } from "react-icons/md";
// import RatingCard from "@/components/miscellaneous/RatingCard";
// import { useRouter } from "next/router";
// import { BiRupee } from "react-icons/bi";
// import { memo } from "react";
// import PropTypes from "prop-types";
// import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
// import Assured from "@/components/miscellaneous/Assured";

// function VendorCard({ vendor, openLeadModel, city, category, locality }) {
//   const imageUrl = vendor?.images?.split(",")[0];
//   const router = useRouter();

//   const handleAnchorClick = async (e, slug) => {
//     e.stopPropagation();
//     await CallingRequest(slug);
//   };

//   const handleShareClick = (e) => {
//     e.stopPropagation();
//     const currentUrl = `https://weddingbanquets.in/delhi/${vendor?.slug}`;
//     const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   const sliceAddress = (address, length) => {
//     return address.length > length ? `${address.slice(0, length)}...` : address;
//   };


//   return (
//     <CardWrapper onClick={() => router.push(`/delhi/${vendor?.slug}`)}>
//       <ImageContainer>
//         <StyledImage
//           src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${imageUrl}`}
//           layout="fill"
//           objectFit="cover"
//           alt={`${category} in ${locality === "all" ? city : locality}`}
//         />
//         {vendor?.wb_assured && <AssuredBadge><Assured /></AssuredBadge>}
//         <RatingBadge>
//           <RatingCard />
//         </RatingBadge>
//       </ImageContainer>
//       <PriceStripe>
//         <span>Package price</span>
//         <Price>
//           <BiRupee />
//           <del>{vendor?.package_price}</del>
//         </Price>
//       </PriceStripe>
//       <Content>
//         <VendorInfo>
//           <VendorName>{vendor?.brand_name}</VendorName>
//           <VendorAddress>{sliceAddress(vendor?.vendor_address, 35)}</VendorAddress>
//         </VendorInfo>
//         <ShareButton onClick={handleShareClick} aria-label="Share on WhatsApp">
//           <MdOutlineWhatsapp />
//         </ShareButton>
//       </Content>
      
//       <Actions>
//         <ActionButton onClick={(e) => { openLeadModel(e, vendor?.slug, vendor?.id); e.stopPropagation(); }}>
//           Get Quotation
//         </ActionButton>
//         <CallButton href={`tel:0${vendor?.phone}`} onClick={(e) => handleAnchorClick(e, vendor?.slug)}>
//           <IoIosCall />
//         </CallButton>
//       </Actions>
//     </CardWrapper>
//   );
// }

// VendorCard.propTypes = {
//   vendor: PropTypes.object.isRequired,
//   openLeadModel: PropTypes.func.isRequired,
//   city: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   locality: PropTypes.string.isRequired,
// };

// export default memo(VendorCard);

// const CardWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: #fff;
//   border-radius: 10px;
//   overflow: hidden;
//   cursor: pointer;
//   transition: transform 0.3s;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   width: 100%;
//   padding-top: 56.25%; 
//   overflow: hidden;
// `;

// const StyledImage = styled(Image)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

// const AssuredBadge = styled.div`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   background: rgba(255, 255, 255, 0.7);
//   padding: 5px 10px;
//   border-radius: 5px;
// `;

// const RatingBadge = styled.div`
//   position: absolute;
//   bottom: 10px;
//   left: 10px;
// `;

// const Content = styled.div`
//   padding: 10px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const VendorInfo = styled.div`
//   max-width: 70%;
// `;

// const VendorName = styled.h2`
//   font-size: 2rem;
//   color: var(--primary-color);
//   margin: 0;
// `;

// const VendorAddress = styled.p`
//   font-size: 1.5rem;
//   color: #777;
//   margin: 5px 0 0;
// `;

// const ShareButton = styled.button`
//   background: #25d366;
//   color: #fff;
//   border: none;
//   border-radius: 1rem;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2.5rem;
//   cursor: pointer;

//   &:hover {
//     background: #1ebe57;
//   }
// `;

// const PriceStripe = styled.div`
//   background: var(--primary-color);
//   color: #fff;
//   padding: 10px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   span {
//     font-size: 1.6rem;
//   }
// `;

// const Price = styled.span`
//   display: flex;
//   align-items: center;
//   font-size: 1.5rem;
//   font-weight: bold;

//   svg {
//     // margin-right: 5px;
//   }
// `;

// const Actions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 20px 20px;
// `;

// const ActionButton = styled.button`
//   flex: 1;
//   margin-right: 10px;
//   background: #f33232;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.5rem;
//   cursor: pointer;

//   &:hover {
//     background: #d72b2b;
//   }
// `;

// const CallButton = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #25d366;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 2.5rem;
//   cursor: pointer;
//   text-decoration: none;

//   &:hover {
//     background: #1ebe57;
//   }
// `;
