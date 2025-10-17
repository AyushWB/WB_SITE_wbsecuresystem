import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Spinner1 } from "@/styles/components/spinner";

// ✅ Lazy-load ReCAPTCHA only when needed (reduces LCP)
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => null,
});

export default function AvailableCheck() {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const {
    leadFormData,
    isAvailableCheckOpen,
    setIsAvailableCheckOpen,
    setIsAvailableCheckShow,
    setIsAvailableCheckID,
    userIP,
    secureToken,
  } = useGlobalContext();

  const [recaptcha, setrecaptcha] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ phoneNumber: "", name: "" });

  // ✅ Stable handler (no new function each render)
  const hideCard = useCallback(() => {
    setIsAvailableCheckOpen(false);
    setIsSent(false);
    setPhoneNumber("");
    setName("");
    setErrors({ phoneNumber: "", name: "" });
  }, [setIsAvailableCheckOpen]);

  const onRecaptchaChange = useCallback((value) => {
    setrecaptcha(value);
  }, []);

  // ✅ Memoize handler to avoid re-renders on every keystroke
  const handlePhoneInput = useCallback((e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setErrors((prev) => ({
      ...prev,
      phoneNumber:
        value.length === 10
          ? parseInt(value, 10) >= 6000000000
            ? ""
            : "Phone number must be greater than or equal to 6000000000"
          : "Phone number must be 10 digits",
    }));
  }, []);

  const handleNameInput = useCallback((e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: value.length <= 200 ? "" : "Name must be 200 characters or less",
    }));
  }, []);

  // ✅ Conversion handler memoized
  const conversionHandler = useCallback(async (type) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN_LIVE}/api/click_conversion_handle`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadFormData, type }),
      });
      const data = await response.json();
      if (data.success) console.log("Conversion tracked:", type);
    } catch (error) {
      console.log(error);
    }
  }, [leadFormData]);

  useEffect(() => {
    if (isAvailableCheckOpen) conversionHandler("click");
  }, [isAvailableCheckOpen, conversionHandler]);

  const submitHandler = useCallback(async () => {
    try {
      if (errors.phoneNumber || errors.name) return;
      setIsLoading(true);
      const utm_source_active = localStorage.getItem("utm_source_active");
      let response = await fetch("/api/save_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: phoneNumber,
          preference: leadFormData.venue_slug,
          name,
          token: secureToken,
          recaptcha,
          is_ad: utm_source_active,
          user_ip: userIP,
        }),
      });

      response = await response.json();

      if (response.status === true) {
        setIsSent(true);
        setrecaptcha(null);
        conversionHandler("conversion");
        setIsAvailableCheckShow(true);
        setIsAvailableCheckID(leadFormData.venue_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    errors,
    phoneNumber,
    name,
    recaptcha,
    leadFormData,
    secureToken,
    userIP,
    conversionHandler,
    setIsAvailableCheckShow,
    setIsAvailableCheckID,
  ]);

  return (
    <Wrapper show={isAvailableCheckOpen}>
      <div className="discont-container" tabIndex="1">
        {/* ✅ SVG interaction stable */}
        <AiOutlineClose className="cancel-icon" onClick={hideCard} />
        <div className="content">
          {isSent ? (
            <Image
              src="/common/namaste.png"
              alt="thank you"
              width={150}
              height={150}
              priority
            />
          ) : (
            <Image
              src="/common/discount.png"
              alt="An example image"
              width={160}
              height={160}
              priority
            />
          )}
          {isSent ? (
            <h3 className="title"> Thank You</h3>
          ) : (
            <div className="title"> Send Enquiry</div>
          )}
          <div className="discount-heading">{!isSent && "get upto 40% off"}</div>
          <p className="discount-text">
            {isSent
              ? "Our team will reach you soon with best price.."
              : "Share your mobile number to see the Availability"}
          </p>

          {!isSent && (
            <>
              <div className="discount-form">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/name.png"}
                        fill
                        alt="flag"
                        sizes="24px"
                        priority={false}
                      />
                    </div>
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleNameInput}
                />
              </div>

              <div className="discount-form">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/calender.png"}
                        fill
                        alt="calender"
                        sizes="24px"
                        priority={false}
                      />
                    </div>
                  </span>
                </div>
                <input
                  type="date"
                  className="input"
                  name="date"
                  min={today}
                  placeholder="Event Date"
                  onClick={(e) => e.target.showPicker()}
                />
              </div>

              <div className="discount-form">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/flag.png"}
                        fill
                        alt="flag"
                        sizes="24px"
                        priority={false}
                      />
                    </div>
                  </span>
                </div>
                <input
                  type="number"
                  name="phone-number"
                  className={`input ${errors.phoneNumber ? "error" : ""}`}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneInput}
                />
              </div>
              {errors.phoneNumber && (
                <span className="error-text">{errors.phoneNumber}</span>
              )}
              {/* Lazy-loaded ReCAPTCHA */}
              {/* <ReCAPTCHA sitekey="YOUR_KEY" onChange={onRecaptchaChange} /> */}
            </>
          )}

          {isSent ? (
            <button className="discount-btn" onClick={hideCard}>
              CLOSE
            </button>
          ) : (
            <button className="discount-btn" onClick={submitHandler}>
              {isLoading ? <Spinner1 /> : "SUBMIT"}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  position: fixed;
  inset: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;

  .discont-container {
    transition: transform 0.3s ease;
    transform: ${({ show }) => (show ? "scale(1)" : "scale(0.5)")};
    max-width: 45rem;
    min-width: 45rem;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px 2000px rgba(0, 0, 0, 0.5);
    padding: 4rem 3rem 5rem 3rem;
    position: relative;

    .cancel-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 3rem;
      color: var(--primary-color);
      cursor: pointer;
      will-change: transform; /* GPU hint for smoother INP */
      transition: transform 0.2s ease;
    }

    .cancel-icon:active {
      transform: scale(0.9);
    }

    .title {
      color: var(--primary-color);
      font-size: 2.5rem;
      font-family: Montserrat;
      font-weight: 700;
      text-transform: capitalize;
    }

    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1.4rem;
    }

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
      border: 1px solid var(--primary-color);

      .country-code {
        padding: 10px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--primary-color);
        color: white;
        font-family: "Poppins";
        font-weight: 400;
        font-size: 1.6rem;
      }

      .flag-box {
        position: relative;
        width: 24px;
        height: 24px;
      }

      .input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 400;
        padding: 5px 0.9rem;
        background-color: white;
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
      transition: background-color 0.3s ease;
    }

    .discount-btn:active {
      background-color: #e05050;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;