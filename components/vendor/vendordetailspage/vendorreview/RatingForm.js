import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";

const RatingForm = ({ vendor_id, onCloseOffCanvas }) => {
  const [rating, setRating] = useState(5);
  const [recaptcha, setrecaptcha] = useState(null);

  const onRecaptchaChange = (value) => {
    setrecaptcha(value);
  };

  // 🔁 Changed from venue_id
  let product_id = vendor_id;
  let product_for = 'vendor'; // 🔁 changed from 'venue'
  let status = 0;

  const saveRatingAjax = async (values) => {
    let data = { ...values, rating, product_id, product_for, status, recaptcha };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/storereview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        onCloseOffCanvas();
        alert('Review Verification Pending');
      } else {
        console.error("Failed to save rating and form data");
      }
    } catch (error) {
      console.error("Error while saving rating and form data", error);
    }
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".fsrrw-star");
    const handleMouseOver = (index) => {
      stars.forEach((star, i) => {
        const svgId = i > index ? "star-blank" : "star-filled";
        star.firstChild.setAttribute("xlink:href", `#${svgId}`);
      });
    };

    const handleMouseDown = (index) => {
      setRating(index + 1);
    };

    const handleMouseLeave = () => {
      stars.forEach((star, i) => {
        const svgId = i + 1 > rating || rating === 0 ? "star-blank" : "star-filled";
        star.firstChild.setAttribute("xlink:href", `#${svgId}`);
      });
    };

    stars.forEach((star, index) => {
      star.addEventListener("mouseover", () => handleMouseOver(index));
      star.addEventListener("mousedown", () => handleMouseDown(index));
    });

    const starWrapper = document.querySelector(".fsrrw-star-wrapper");
    starWrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stars.forEach((star, index) => {
        star.removeEventListener("mouseover", () => handleMouseOver(index));
        star.removeEventListener("mousedown", () => handleMouseDown(index));
      });

      starWrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rating]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    comment: Yup.string().required("Comment is required"),
    number: Yup.string().required("Number is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", comment: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        saveRatingAjax(values);
      }}
    >
      <StyledForm>
        {/* Star SVG definitions */}
        <svg style={{ display: 'none', enableBackground: 'new 0 0 50 50' }} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="star-blank" viewBox="0 0 50 50">
            <path fill="gold" d="..." />
          </symbol>
          <symbol id="star-filled" viewBox="0 0 50 50">
            <polygon fill="gold" points="..." />
          </symbol>
          <symbol id="star-half" viewBox="0 0 50 50">
            <path fill="gold" d="..." />
          </symbol>
        </svg>

        {/* Star Selection */}
        <Section className="fsrrw-star-wrapper">
          {[...Array(5)].map((_, index) => (
            <svg key={index} className="fsrrw-star">
              <use xlinkHref="#star-filled" />
            </svg>
          ))}
        </Section>

        {/* Form Fields */}
        <ReviewForm>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <div className="text-err"><ErrorMessage name="name" /></div>
          </div>

          <div>
            <label htmlFor="number">Number:</label>
            <Field type="text" id="number" name="number" />
            <div className="text-err"><ErrorMessage name="number" /></div>
          </div>

          <div>
            <label htmlFor="comment">Comment:</label>
            <Field as="textarea" id="comment" name="comment" />
            <div className="text-err"><ErrorMessage name="comment" /></div>
          </div>
        </ReviewForm>

        {/* Optional ReCAPTCHA */}
        {/* <ReCAPTCHA sitekey="..." onChange={onRecaptchaChange} /> */}

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </Formik>
  );
};

const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const Section = styled.div`
  background-color: #fff;
  svg.fsrrw-star {
    width: 35px;
    height: 35px;
    display: inline-block;
    cursor: pointer;
  }
`;

const ReviewForm = styled.div`
  label {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    display: block;
    margin-bottom: 2px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  textarea {
    height: 150px;
  }

  .text-err {
    color: red;
    font-size: 12px;
  }
`;

const StyledButton = styled.button`
  background: var(--primary-color);
  color: white;
  font-size: 1.8rem;
  font-family: "Poppins";
  font-weight: 500;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default RatingForm;
