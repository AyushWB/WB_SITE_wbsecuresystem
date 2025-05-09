// import styled from "styled-components";
// import VendorCard from "./VendorCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import useLeadModel from "@/lib/hook/useLeadModel";
// import { useGlobalContext } from "@/context/MyContext";
// import useCallConversion from "@/lib/hook/useCallConversion";

// // Import Swiper styles
// import "swiper/css";

// // import required modules
// import { Autoplay } from "swiper";

// export default function VendorSlider({ vendors }) {
//   const { selectedCity } = useGlobalContext();
//   const { openLeadModel } = useLeadModel();
//   const { callConversion } = useCallConversion();

//   return (
//     <Div className="popular-vendor-container">
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={180}
//         loop={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: true,
//         }}
//         breakpoints={{
//           450: {
//             slidesPerView: 2,
//             spaceBetween: 100,
//           },
//           500: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 20,
//           },
//           1200: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//         }}
//         modules={[Autoplay]}
//         className="mySwiper"
//       >
//         {vendors?.map((vendor) => (
//           <SwiperSlide key={vendor.id}>
//             <VendorCard
//               vendor={vendor}
//               openLeadModel={openLeadModel}
//               callConversion={callConversion}
//               city={selectedCity}
//               category={vendor.category}
//               locality={vendor.locality}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Div>
//   );
// }

// const Div = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 2rem 1rem;

//   .mySwiper {
//     position: static;
//     overflow: hidden;
//   }
// `;



import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation } from "swiper";
import VendorCard from "./VendorCard";
import NavigationButton from "@/components/miscellaneous/NavigationButton";
import VendorGrid from "./VendorGrid";
import ExtraCard from "./ExtraCard";
import { useGlobalContext } from "@/context/MyContext";

export default function VendorSlider() {
  const { vendorCategories, } = useGlobalContext();
  return (
    <Section className="section section-vendors">
      <Heading
        text={"Explore Wedding Categories"}
        desc={
          "Explore our top-rated wedding vendors on Wedding Banquets and make your dream wedding a reality."
        }
      />
      <div className="container">
        <Swiper
          loop={true}
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          breakpoints={{
            600: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          // navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide key='6257'>
            <ExtraCard img={`/vendor-vector/1.png`} data="" />
          </SwiperSlide>
          {vendorCategories.map((vendor, i) => {
            return (
              <SwiperSlide key={vendor.id}>
                <VendorCard
                  img={`/vendor-vector/${vendor.id}.png`}
                  data={vendor}
                />
              </SwiperSlide>
            );
          })}
          <NavigationButton direction={"left"} />
          <NavigationButton direction={"right"} />
        </Swiper>
      </div>
      <VendorGrid vendorCategories={vendorCategories} />
    </Section>
  );
}

const Section = styled.section`
  .mySwiper {
    padding: 3rem 1rem;
  }

  @media (max-width: 600px) {
    .mySwiper {
      display: none;
    }
  }
`;
