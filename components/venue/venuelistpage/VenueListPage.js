// import TopFilter from "@/components/miscellaneous/TopFilter";
// import Header from "@/components/layout.js/Header";
// import { useGlobalContext } from "@/context/MyContext";
// import VenueContainer from "@/components/venue/venuelistpage/venuecontainer/VenueContainer";
// import SideFilter from "./filter/SideFilter";
// import Footerdescription from "@/components/miscellaneous/pagedescription/PageDescription";
// import Offer from "@/components/miscellaneous/Offer";

// export default function VenueListPage({ data }) {
//   const { city, locality, category, localities, result, filterQuery } = data;

//   const { venueCategories, vendorCategories } = useGlobalContext();

//   return (
//     <>
//       <SideFilter
//         category={category}
//         localities={localities}
//         city={city}
//         venueCategories={venueCategories}
//         locality={locality}
//         filterQuery={filterQuery}
//       />
//       <Header />
//       <TopFilter
//         category={category}
//         localities={localities}
//         city={city}
//         venueCategories={venueCategories}
//         locality={locality}
//         filterQuery={filterQuery}
//       />
//             <Offer/>

//       <VenueContainer
//         lists={result.data}
//         locality={locality}
//         category={category}
//         count={result.count}
//         city={city}
//         localities={localities}
//         venueCategories={venueCategories}
//         vendorCategories={vendorCategories}
//         filterQuery={filterQuery}
//       />
//       <Footerdescription caption={result.meta?.caption} />
//     </>
//   );
// }



import dynamic from "next/dynamic";
import Header from "@/components/layout.js/Header";
import { useGlobalContext } from "@/context/MyContext";

// Dynamic imports for performance
const TopFilter = dynamic(() => import("@/components/miscellaneous/TopFilter"), { loading: () => <div /> });
const VenueContainer = dynamic(() => import("@/components/venue/venuelistpage/venuecontainer/VenueContainer"), { loading: () => <div /> });
const SideFilter = dynamic(() => import("./filter/SideFilter"), { loading: () => <div /> });
const Footerdescription = dynamic(() => import("@/components/miscellaneous/pagedescription/PageDescription"), { loading: () => <div /> });
const Offer = dynamic(() => import("@/components/miscellaneous/Offer"), { loading: () => <div /> });

export default function VenueListPage({ data }) {
  const { city, locality, category, localities, result, filterQuery } = data;
  const { venueCategories, vendorCategories } = useGlobalContext();

  return (
    <>
      <SideFilter
        category={category}
        localities={localities}
        city={city}
        venueCategories={venueCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <Header />
      <TopFilter
        category={category}
        localities={localities}
        city={city}
        venueCategories={venueCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <Offer />
      <VenueContainer
        lists={result.data}
        locality={locality}
        category={category}
        count={result.count}
        city={city}
        localities={localities}
        venueCategories={venueCategories}
        vendorCategories={vendorCategories}
        filterQuery={filterQuery}
      />
      <Footerdescription caption={result.meta?.caption} />
    </>
  );
}