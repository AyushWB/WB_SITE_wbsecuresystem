import Header from "@/components/layout.js/Header";
import BreadCrumb from "@/components/miscellaneous/NavigationHeader";
import VendorBasicInfo from "./vendorbasicinfo/VendorBasicInfo";
import { useRouter } from "next/router";
import Policies from "./policy/Policies";
import SimilarVendors from "./similarvendor/SimilarVendor";
import Tabs from "./tabs/Tabs";
import ImageSlider from "@/components/venue/venuedetailspage/imageslider/ImageSlider";
import HaveUsCallYou from "@/components/miscellaneous/haveuscallyou/HaveUsCallYou";
import { useGlobalContext } from "@/context/MyContext";
import Gallery from "@/components/vendor/vendordetailspage/gallery/Gallery";
import TabsComponent from "./tabsComponent/TabsComponent";
import VendorReview from "./vendorreview/VendorReview";

export default function VendorDetailsPage({ response }) {
  // console.log(response)
  const router = useRouter();

  const { setLeadFormData, setIsLeadsModelOpen } = useGlobalContext();

  const { similar_vendors, vendor } = response.data;
  // console.log(similar_vendors,vendor)

  // Define vendor_place_id from vendor data
  const vendor_place_id = vendor?.location_place_id;
  // Define reviews from response data
  const reviews = response.reviews || [];

  const openLeadsModel = (e, v_slug = vendor?.slug, v_id = vendor?.id) => {
    const leadData = {
      url: router.asPath,
      vendor_id: v_id,
      vendor_slug: v_slug,
      type: "click",
      request_handle_by: "form",
    };
    // console.log(leadData)

    //Setting the data to the form
    setLeadFormData(leadData);

    //Opening the lead model
    setIsLeadsModelOpen(true);

    if (e) {
      e.stopPropagation();
    }
  };
  return (
    <>
      <Header />
      <BreadCrumb meta_title={vendor.meta_title} />
      <ImageSlider
        images={vendor.images}
        rating={vendor?.place_rating}
        ratingcount={vendor?.reviews_count}
        altname={vendor?.brand_name}
        wb_assured={vendor?.wb_assured}
        slug={vendor?.slug}
      />
      <VendorBasicInfo vendor={vendor} openLeadsModel={openLeadsModel} />
      <HaveUsCallYou />
      <Policies />
      <VendorReview
        vendor_place_id={vendor_place_id}
        vendor={vendor}
        reviews={reviews}
      />
      {similar_vendors && <SimilarVendors vendors={similar_vendors} />}
    </>
  );
}
