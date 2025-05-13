// Import necessary modules and components
import Image from "next/image";
import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import "swiper/swiper-bundle.min.css";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import RatingForm from "./RatingForm";

// Define the main component
function VendorReview({ vendor_place_id, vendor }) { // CHANGE: venue -> vendor
  // State variables
  const [reviewData, setReviewData] = useState(null);
  const [siteReviewData, setSiteReviewData] = useState(null);
  const [showFullText, setShowFullText] = useState([]);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isOffCanvasReviewOpen, setIsOffCanvasReviewOpen] = useState(false);
  const vendorData = vendor; // CHANGE: venueData -> vendorData

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetch vendor-specific reviews
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_json_reviews/${vendor_place_id}` // CHANGE: vendor_place_id
      );
      const data = await response.json();
      setShowFullText(Array(data.reviews.length).fill(false));
      setReviewData(data);
    } catch (error) {
      console.error(error);
      setReviewData(null);
    }

    try {
      // Fetch site-wide reviews
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_json_reviews_site/${vendorData.id}` // CHANGE: vendorData
      );
      const dataReview = await response.json();
      setSiteReviewData(dataReview);
    } catch (error) {
      console.error(error);
      setSiteReviewData(null);
    }
  };

  // Fetch data when component mounts or when dependencies change
  useEffect(() => {
    fetchData();
  }, [vendor_place_id, vendorData]); // CHANGE

  const toggleFullText = (index) => {
    setShowFullText((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const openOffCanvas = () => {
    setIsOffCanvasOpen(true);
  };

  const closeOffCanvas = () => {
    setIsOffCanvasOpen(false);
  };

  const openOffCanvasReview = () => {
    setIsOffCanvasReviewOpen(true);
  };

  const closeOffCanvasReview = () => {
    setIsOffCanvasReviewOpen(false);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const goldStars = Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} color="#FFD700" />
    ));
    const grayStars = Array.from(
      { length: totalStars - rating },
      (_, index) => <FaStar key={index} color="#A9A9A9" />
    );
    return [...goldStars, ...grayStars];
  };

  const renderWriteReviewButton = () => (
    <div className="write-a-review">
      <div className="heading">Have something to share about the vendor?</div> {/* CHANGE */}
      <button className="add-review-btn" onClick={openOffCanvas}>
        Write a review
      </button>
    </div>
  );

  const renderOffCanvas = () => (
    <section>
      <div id="sidebar">
        <div className="row close-and-heading">
          <div className="close-btn reviewer_name" onClick={closeOffCanvas}>
            X
          </div>
          <div className="reviewer_name">Write A Review & Ratings</div>
        </div>
        <div className="rating-card">
          <RatingForm vendor_id={vendor.id} onCloseOffCanvas={closeOffCanvas} /> {/* CHANGE: venue_id -> vendor_id */}
        </div>
      </div>
    </section>
  );

  const renderReviewOffCanvas = () => (
    <section>
      <div id="sidebar">
        <div className="row close-and-heading">
          <div className="close-btn reviewer_name" onClick={closeOffCanvasReview}>
            X
          </div>
          <div className="reviewer_name">See All Verified Review & Ratings</div>
        </div>
        <div className="rating-card">
          <div className="review-cards-container">
            {reviewData?.reviews?.slice(0, 4).map((review, index) =>
              review.rating >= 4 ? (
                <div className="cardR" key={index}>
                  <div className="card-top">
                    <div className="card-bottom">
                      <div className="prof">
                        <Image
                          src={review.profile_photo_url}
                          width={50}
                          height={50}
                          alt="review-img"
                        />
                      </div>
                      <div className="prof-detail">
                        <div className="reviewer_name">{review.author_name}</div>
                        <div style={{ display: "flex" }} className="review_stars">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="verified"> {/* unchanged */}
                        {/* SVG VERIFIED ICON */}
                      </div>
                    </div>
                    <p>
                      {showFullText[index]
                        ? review.text
                        : `${review.text.split(" ").slice(0, 20).join(" ")} ...`}
                      <br />
                      <a onClick={() => toggleFullText(index)} className="g_review">
                        {showFullText[index] ? "Read Less" : "Read More"}
                      </a>
                    </p>
                  </div>
                </div>
              ) : null
            )}
            {siteReviewData?.map((review) => (
              <div className="cardR" key={review.id}>
                <div className="card-top">
                  <div className="card-bottom">
                    <div className="prof"></div>
                    <div className="prof-detail">
                      <div className="reviewer_name">{review.users_name}</div>
                      <div style={{ display: "flex" }} className="review_stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="verified">{/* SVG VERIFIED ICON */}</div>
                  </div>
                  <p>
                    {showFullText[review.id]
                      ? review.comment
                      : `${review.comment.split(" ").slice(0, 20).join(" ")} ...`}
                    <br />
                    <a onClick={() => toggleFullText(review.id)} className="g_review">
                      {showFullText[review.id] ? "Read Less" : "Read More"}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <Heading title="Verified Reviews for this Vendor" /> {/* CHANGE: Venue -> Vendor */}
      {renderWriteReviewButton()}
      {renderOffCanvas()}
      {renderReviewOffCanvas()}
    </div>
  );
}

const Section = styled.div`
  background-color: var(--bg-color);
  .card {
    width: 48%;
    padding: 15px 30px 15px 0px;
    cursor: pointer;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
  }
  .cardR {
    width: 90%;
    padding: 15px 30px 15px 0px;
    cursor: pointer;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
  .review-rating-heading {
    font-size: 22px;
    line-height: 32px;
    color: #000;
    font-weight: 500 !important;
    word-break: break-word;
  }
  .review-rating-details {
    justify-content: space-between;
  }
  .rating-heading {
    margin: 15px 0 25px 0;
  }
  .review-rating-rating {
    font-size: 20px;
    margin-top: -4px;
    margin-right: 4px;
    color: #000;
    font-weight: 800 !important;
    word-break: break-word;
  }
  .row {
    display: flex;
  }
  .review-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .verified {
    margin-left: 5px;
  }

  .reviewer_name {
    font-family: "Poppins";
    font-weight: 500 !important;
    font-size: 1.8rem !important;
  }
  .see-all-reviews {
    font-family: "Poppins";
    font-weight: 500 !important;
    font-size: 1.8rem !important;
  }
  .g_review {
    font-family: "Poppins" !important;
    font-size: 1.8rem !important;
    font-weight: 400;
    color: var(--info-color);
    cursor: pointer;
  }

  .review_stars svg {
    height: 20px;
    width: 20px;
  }
  .card-bottom .review_stars svg {
    height: 15px;
    width: 15px;
  }
  p {
    font-weight: 400 !important;
    font-size: 1.7rem !important;
    padding-top: 5px;
  }

  .card-top p:nth-child(1),
  h3 {
    font-family: "DM Sans", sans-serif;
  }
  .card-hading {
    padding-bottom: 20px;
  }
  .card-bottom {
    padding-top: 20px;
    display: flex;
    align-items: center;
  }
  .prof {
    border-radius: 50%;
    background-color: #eee;
  }
  .prof img {
    width: 40px;
    height: 40px;
    max-width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .prof-detail {
    padding-left: 10px;
  }
  .prof-detail p {
    font-family: "Ephesis", cursive;
  }
  .write-a-review {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    background: #f8dddd;
    margin-top: 8px;
    border-radius: 6px;
    padding: 16px;
  }
  .write-a-review .heading {
    font-weight: 400 !important;
    font-size: 2rem !important;
    padding-top: 2px;
  }
  .add-review-btn {
    border: none;
    font-size: 1.8rem;
    background: var(--primary-color);
    z-index: 1;
    grid-column: 1/-1;
    color: white;
    font-size: 1.8rem;
    font-family: "Poppins";
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
    border-radius: 0.3rem;
    margin-left: 15px;
  }

  //   offcanvas
  #main-content {
    transition: margin-left 0.5s;
    padding: 16px;
  }

  #sidebar {
    height: 100%;
    width: 500px;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
  }

  .close-and-heading {
    background: var(--primary-color);
    color: #fff;
    padding: 8px 0px;
  }
  .close-btn {
    padding: 0 20px;
    cursor: pointer;
  }
  @media only screen and (max-width: 730px) {
    #sidebar {
      width: 300px !important;
    }
    .card {
      width: 100%;
      padding: 25px 0px 25px 0px;
      cursor: pointer;
      border-top: 1px dashed rgba(0, 0, 0, 0.1);
    }
    .review-rating-heading {
      font-size: 16px;
    }
    .rating-heading {
      margin: 0px 0 25px 0;
    }
  }
`;

export default VendorReview;
