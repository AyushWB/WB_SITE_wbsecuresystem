// import BreadCrumb from "@/components/miscellaneous/NavigationHeader";
// import StickyButton from "@/components/miscellaneous/StickyButton";
// import Header from "@/components/layout.js/Header";
// import Faqs from "@/components/venue/venuedetailspage/faqs/Faqs";
// import FoodPackage from "@/components/venue/venuedetailspage/foodpackage/FoodPackage";
// import HaveUsCallYou from "@/components/miscellaneous/haveuscallyou/HaveUsCallYou";
// import ImageSlider from "@/components/venue/venuedetailspage/imageslider/ImageSlider";
// import SimilarVenue from "@/components/venue/venuedetailspage/similarvenue/SimilarVenue";
// import VenueMap from "@/components/venue/venuedetailspage/venueamap/VenueMap";
// import VenueBasicInfo from "@/components/venue/venuedetailspage/venuebasicinfo/VenueBasicInfo";
// import VenueFeatures from "@/components/venue/venuedetailspage/venuefeature/VenueFeatures";
// import VenuePolicy from "@/components/venue/venuedetailspage/venuepolicy/VenuePolicy";
// import VenueReview from "@/components/venue/venuedetailspage/venuereview/VenueReview";
// import { useGlobalContext } from "@/context/MyContext";
// import { useRouter } from "next/router";

// export default function VenueDetailsPage({ response }) {

//     const { setLeadFormData, setIsLeadsModelOpen, setIsAvailableCheckOpen } = useGlobalContext();
//     const router = useRouter();

//     const { data, reviews } = response;
//     const { similar_packages, venue } = data;
//     let venue_place_id = venue?.location_place_id;

//     const openLeadsModel = (e, v_slug = venue?.slug, v_id = venue?.id, by = "form") => {
//         const leadData = {
//             url: router.asPath,
//             venue_id: v_id,
//             venue_slug: v_slug,
//             type: "click",
//             request_handle_by: by
//         }
//         setLeadFormData(leadData);
//         setIsLeadsModelOpen(true);
//         if (e) {
//             e.stopPropagation();
//         }
//     }
//     const openAvailableCheck = (e, v_slug = venue?.slug, v_id = venue?.id, by = "form") => {
//         const leadData = {
//             url: router.asPath,
//             venue_id: v_id,
//             venue_slug: v_slug,
//             type: "click",
//             request_handle_by: by
//         }
//         setLeadFormData(leadData);
//         setIsAvailableCheckOpen(true);
//         if (e) {
//             e.stopPropagation();
//         }
//     }

//     return (
//         <>
//             <Header />
//             <BreadCrumb meta_title={venue.meta_title} />
//             <ImageSlider images={venue.images} rating={venue.place_rating ?? 4.5} ratingcount={reviews.length === 0 ? 158 : reviews.length} altname={venue.name} wb_assured={venue?.wb_assured} />
//             <VenueBasicInfo venue={venue} openLeadsModel={openLeadsModel} openAvailableCheck={openAvailableCheck} id={venue.id} />
//             <VenueFeatures venue={venue}/>
//             <FoodPackage venue={venue} nonveg_foods={venue?.nonveg_foods} veg_foods={venue?.veg_foods} />
//             {/* <HaveUsCallYou /> */}
//             <VenuePolicy venue={venue} />
//             <VenueReview venue_place_id={venue_place_id} venue={venue} reviews={reviews} />
//             <VenueMap location_map={venue.location_map} />
//             <StickyButton openLeadsModel={openLeadsModel} phone={venue.phone} slug={venue.slug} id={venue.id} />
//             <SimilarVenue similar_packages={similar_packages} />
//             <Faqs faqs={venue?.faq} name={venue?.name} />
//         </>
//     )
// }

































import Head from "next/head";
import BreadCrumb from "@/components/miscellaneous/NavigationHeader";
import StickyButton from "@/components/miscellaneous/StickyButton";
import Header from "@/components/layout.js/Header";
import Faqs from "@/components/venue/venuedetailspage/faqs/Faqs";
import FoodPackage from "@/components/venue/venuedetailspage/foodpackage/FoodPackage";
import HaveUsCallYou from "@/components/miscellaneous/haveuscallyou/HaveUsCallYou";
import ImageSlider from "@/components/venue/venuedetailspage/imageslider/ImageSlider";
import SimilarVenue from "@/components/venue/venuedetailspage/similarvenue/SimilarVenue";
import VenueMap from "@/components/venue/venuedetailspage/venueamap/VenueMap";
import VenueBasicInfo from "@/components/venue/venuedetailspage/venuebasicinfo/VenueBasicInfo";
import VenueFeatures from "@/components/venue/venuedetailspage/venuefeature/VenueFeatures";
import VenuePolicy from "@/components/venue/venuedetailspage/venuepolicy/VenuePolicy";
import VenueReview from "@/components/venue/venuedetailspage/venuereview/VenueReview";
import { useGlobalContext } from "@/context/MyContext";
import { useRouter } from "next/router";

export default function VenueDetailsPage({ response }) {
    const { setLeadFormData, setIsLeadsModelOpen, setIsAvailableCheckOpen } = useGlobalContext();
    const router = useRouter();

    const { data, reviews } = response;
    const { similar_packages, venue } = data;
    let venue_place_id = venue?.location_place_id;

    const openLeadsModel = (e, v_slug = venue?.slug, v_id = venue?.id, by = "form") => {
        const leadData = {
            url: router.asPath,
            venue_id: v_id,
            venue_slug: v_slug,
            type: "click",
            request_handle_by: by
        }
        setLeadFormData(leadData);
        setIsLeadsModelOpen(true);
        if (e) e.stopPropagation();
    }

    const openAvailableCheck = (e, v_slug = venue?.slug, v_id = venue?.id, by = "form") => {
        const leadData = {
            url: router.asPath,
            venue_id: v_id,
            venue_slug: v_slug,
            type: "click",
            request_handle_by: by
        }
        setLeadFormData(leadData);
        setIsAvailableCheckOpen(true);
        if (e) e.stopPropagation();
    }

    // ✅ SEO schema for AggregateRating
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": venue?.name || "Venue Name",
        "url": `https://weddingbanquets.in/${router.asPath}`,
        "logo": {
            "@type": "ImageObject",
            "contentUrl": `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${venue?.images?.split(",")[0]}`,
        },
        "image":
            venue?.images
                ?.split(",")
                .map((img) => ({
                    "@type": "ImageObject",
                    "contentUrl": `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${img}`
                })) || [],
        "description": venue?.meta_description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": venue?.venue_address || "",
            "addressLocality": venue?.city || "New Delhi, Delhi NCR",
            "addressRegion": venue?.state || "Delhi NCR",
            "addressCountry": "India"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": venue?.place_rating || 4.5,
            "reviewCount": reviews?.length || 158,
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviews.slice(0, 4).map((review) => ({
            "@type": "Review",
            "datePublished": review.created_at,
             "reviewBody": review?.comment || "Great experience!",
            "author": {
              "@type": "Person",
              "name": review?.users_name || "Anonymous"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review?.rating || 0,
              "bestRating": "5",
              "worstRating": "1"
            },
          })),
          "priceRange": `Rs. ${venue.veg_price} - ${venue.nonveg_price}`,
        };


    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
            </Head>

            <Header />
            <BreadCrumb meta_title={venue.meta_title} />
            <ImageSlider
                images={venue.images}
                rating={venue.place_rating ?? 4.5}
                ratingcount={reviews.length === 0 ? 158 : reviews.length}
                altname={venue.name}
                wb_assured={venue?.wb_assured}
            />
            <VenueBasicInfo
                venue={venue}
                openLeadsModel={openLeadsModel}
                openAvailableCheck={openAvailableCheck}
                id={venue.id}
            />
            <VenueFeatures venue={venue} />
            <FoodPackage
                venue={venue}
                nonveg_foods={venue?.nonveg_foods}
                veg_foods={venue?.veg_foods}
            />
            {/* <HaveUsCallYou /> */}
            <VenuePolicy venue={venue} />
            <VenueReview
                venue_place_id={venue_place_id}
                venue={venue}
                reviews={reviews}
            />
            <VenueMap location_map={venue.location_map} />
            <StickyButton
                openLeadsModel={openLeadsModel}
                phone={venue.phone}
                slug={venue.slug}
                id={venue.id}
            />
            <SimilarVenue similar_packages={similar_packages} />
            <Faqs faqs={venue?.faq} name={venue?.name} />
        </>
    );
}
