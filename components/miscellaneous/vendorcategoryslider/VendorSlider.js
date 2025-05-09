import styled from "styled-components";
import VendorCard from "./VendorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useLeadModel from "@/lib/hook/useLeadModel";
import { useGlobalContext } from "@/context/MyContext";
import useCallConversion from "@/lib/hook/useCallConversion";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper";

export default function VendorSlider({ vendors }) {
  const { selectedCity } = useGlobalContext();
  const { openLeadModel } = useLeadModel();
  const { callConversion } = useCallConversion();

  return (
    <Div className="popular-vendor-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={180}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          450: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {vendors?.map((vendor) => (
          <SwiperSlide key={vendor.id}>
            <VendorCard
              vendor={vendor}
              openLeadModel={openLeadModel}
              callConversion={callConversion}
              city={selectedCity}
              category={vendor.category}
              locality={vendor.locality}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Div>
  );
}

const Div = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .mySwiper {
    position: static;
    overflow: hidden;
  }
`;