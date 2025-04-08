import Blog from "@/components/homepage/blog/Blog";
import Contact from "@/components/homepage/contactUs/Contact";
import Hero from "@/components/homepage/hero/Hero";
import HowItWorks from "@/components/homepage/howitwork/HowItWorks";
import Navbar from "@/components/layout.js/Navbar";
import PopularVenue from "@/components/miscellaneous/popular venue/PopularVenue";
import VendorSlider from "@/components/miscellaneous/vendorcategoryslider/VendorSlider";
import WhyUs from "@/components/homepage/whyus/WhyUs";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/MyContext";
import LeadForm from "@/components/homepage/leadform/LeadForm";
import CityVenueHall from "@/components/miscellaneous/footer/CityVenueHall";
import iscity from "@/lib/request/iscity/isCity";
import VendorCategoryCardGrid from "@/components/miscellaneous/vendorcategorycardgrid/VendorCategoryCardGrid";
import { query } from "@/utils/db";

export default function Home({
  venueCategogies,
  cities,
  popularVenues,
  blogposts,
  vendorCategories,
  vendor_list,
  venue_list,
  city,
}) {
  const { setSelectedCity } = useGlobalContext();

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);
  return (
    <div>
      <Navbar />
      <Hero
        venueCategogies={venueCategogies}
        vendorCategories={vendorCategories}
        vendor_list={vendor_list}
        venue_list={venue_list}
        cities={cities}
      />
      <VendorSlider vendorCategories={vendorCategories} />
      <PopularVenue popularVenues={popularVenues} />
      <HowItWorks />
      <LeadForm />
      <Blog posts={blogposts} />
      <WhyUs />
      <Contact />
      <VendorCategoryCardGrid />
      <CityVenueHall cities={cities} />
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { category: slug } = params;

  if (await iscity(slug)) {
    try {
      const url = `${process.env.SERVER_DOMAIN}/api/home_page/`;
      let homePageData = await fetch(url);
      homePageData = await homePageData.json();

      let blogposts = homePageData.data.blogs;

      return {
        props: {
          venueCategogies: homePageData.data.venue_categories || null,
          vendorCategories: homePageData.data.vendor_categories || null,
          cities: homePageData.data.cities || null,
          popularVenues: homePageData.data.popular_venues || null,
          blogposts: blogposts || null,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  } else {
    
  }
}
