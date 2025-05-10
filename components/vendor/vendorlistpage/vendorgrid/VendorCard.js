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
            <div className="icon-wrapper">
              <MdOutlinePriceChange className="icon" />
            </div>
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
                <span className="price">
                  &nbsp;
                {`${vendor?.yrs_exp !== undefined &&
                  vendor?.yrs_exp !== null &&
                  vendor?.yrs_exp !== 0
                  ? vendor.yrs_exp
                  : "5+"
                  } Yr's`}
                  </span>
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
    display: flex;
    font-size: 1.6rem;
    color: #333;
    gap:2px;
    margin-top:5px;
      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.2rem;
        color: var(--para);
        width: 30px;
      }
  }

    .package-title{
      color: var(--para);
      font-family: Poppins;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .package-price {
      display: flex;
      justify-content: center;  
      align-items: center;      
      font-family: Montserrat;
      font-weight: 600;
      color: black;
      font-size: 2.2rem;
      text-align: center;   
      height: 100%;
      margin-top: 2px;
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
      padding: 0 1rem;
      display: flex;
      gap: 6px;
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
        font-family: Montserrat;
        font-weight: 600;
        color: black;
        font-size: 2.2rem;
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