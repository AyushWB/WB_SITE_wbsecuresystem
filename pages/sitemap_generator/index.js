// import Heading from "@/components/miscellaneous/Heading"; 
// import styled from "styled-components";
// import { useGlobalContext } from "@/context/MyContext";
// import { useEffect, useState } from "react";
// import getLocalities from "@/lib/request/getlocalities/getLocalities";

// export default function SitemapGenPage() {
//     const { cities, vendorCategories, venueCategories } = useGlobalContext();
//     const [localities, setLocalities] = useState([]);
//     const [count, setCount] = useState(0);

//     const [selectedCity, setSelectedCity] = useState("");
//     const [selectedCat, setSelectedCat] = useState("");

//     const [sitemapData, setSiteMapData] = useState("");
//     const [venuesData, setVenuesData] = useState([]);
//     const [vendorsData, setVendorsData] = useState([]);
//     const [venueslistData, setVenuesListData] = useState([]);
//     const [vendorslistData, setVendorsListData] = useState([]);

//     const baseUrl = 'https://weddingbanquets.in';


//     // ✅ Fetch Venues Data
//     useEffect(() => {
//         const fetchVenues = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_venue/1`);
//                 const data = await response.json();
//                 setVenuesData(data.sitemap);
//             } catch (error) {
//                 console.error("Error fetching venues:", error);
//             }
//         };
//         fetchVenues();
//     }, []);

//      // ✅ Fetch Vendors Data
//      useEffect(() => {
//         const fetchVendors = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_vendor/1`);
//                 const data = await response.json();
//                 setVendorsData(data.sitemap);
//             } catch (error) {
//                 console.error("Error fetching vendors:", error);
//             }
//         };
//         fetchVendors();
//     }, []);

//     // ✅ Fetch Venueslist Data
//     useEffect(() => {
//         const fetchVenueslist = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_location_venues/1`);
//                 const data = await response.json();
//                 setVenuesListData(data.sitemap);
//             } catch (error) {
//                 console.error("Error fetching venues:", error);
//             }
//         };
//         fetchVenueslist();
//     }, []);

//     // ✅ Fetch Vendorslist Data
//     useEffect(() => {
//         const fetchVendorslist = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_location_vendor/1`);
//                 const data = await response.json();
//                 setVendorsListData(data.sitemap);
//             } catch (error) {
//                 console.error("Error fetching vendors:", error);
//             }
//         };
//         fetchVendorslist();
//     }, []);

//     // ✅ Fetch Localities based on Selected City
//     useEffect(() => {
//         const fetchLocalities = async () => {
//             const response = await getLocalities(selectedCity);
//             if (response.success) {
//                 setLocalities(response.data);
//             }
//         };
//         fetchLocalities();
//     }, [selectedCity]);

//     // ✅ Utility Function for Current Date
//     function getCurrentDateTime() {
//         return new Date().toISOString();
//     }


//         const generateSitemap = async () => {
//             let rawSitemap = "";
        
//             if (!selectedCat) {
//                 alert("Select category");
//                 return;
//             }

//          // ✅ Venue Sitemap
//          if (selectedCat === "1") {
//             venuesData.forEach(cat => {
//                     rawSitemap += `<url>
//                         <loc>${baseUrl}/${cat.url}</loc>
//                         <lastmod>${getCurrentDateTime()}</lastmod>
//                         <priority>1.00</priority>
//                         </url>\n`;
//                 }
//             );
//             setCount(vendorCategories.length * localities.length);
//         }

//         // ✅ Vendor Sitemap 
//         if (selectedCat === "2") {
//             vendorsData.forEach(cat => {
//                     rawSitemap += `<url>
//                         <loc>${baseUrl}/${cat.url}</loc>
//                         <lastmod>${getCurrentDateTime()}</lastmod>
//                         <priority>1.00</priority>
//                         </url>\n`;
//                 }
//             );
//             setCount(vendorCategories.length * localities.length);
//         }




//         // ✅ Venue List Sitemap
//         if (selectedCat === "3") {
//             venueslistData.forEach(cat => {
//                 // localities.forEach(locality => {
//                     rawSitemap += `<url>
//                         <loc>${baseUrl}/${cat.url}</loc>
//                         <lastmod>${getCurrentDateTime()}</lastmod>
//                         <priority>1.00</priority>
//                         </url>\n`;
//                 }
//             );
//             // });
//             setCount(vendorCategories.length * localities.length);
//         }

//         // ✅ Vendor List Sitemap (All Cities)
//         if (selectedCat === "4") {
//             vendorslistData.forEach(cat => {
//                     rawSitemap += `<url>
//                         <loc>${baseUrl}/${cat.url}</loc>
//                         <lastmod>${getCurrentDateTime()}</lastmod>
//                         <priority>1.00</priority>
//                         </url>\n`;
//                 }
//             );
//             setCount(vendorCategories.length * localities.length);
//         }
    
//         setSiteMapData(rawSitemap);
//     };

//     return (
//         <Wrapper className="section">
//             <div className="container sitemap-container">
//                 <Heading text="Generate Sitemap" />
//                 <div className="sitemap-filter-container">
//                     <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
//                         <option value="">Select City</option>
//                         {cities.map(city => (
//                             <option key={city.id} value={city.slug}>{city.name}</option>
//                         ))}
//                     </select>
                    
//                     <select onChange={(e) => setSelectedCat(e.target.value)}>
//                         <option value="">Select Category</option>
//                         <option value="1">Venue </option>
//                         <option value="2">Vendor </option>
//                         <option value="3">Venue List </option>
//                         <option value="4">Vendor List </option>
//                     </select>

//                     <button onClick={generateSitemap}>Generate</button>
//                 </div>
//                 <h2>Total Sitemap Generated: {count}</h2>
//                 <textarea value={sitemapData} readOnly />
//             </div>
//         </Wrapper>
//     );
// }

// const Wrapper = styled.section`
// .sitemap-container{
//     display: flex;
//     flex-direction: column;
//     gap: 3rem;
// }

// .sitemap-filter-container{

//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 2rem;

//     select{
//         padding: 1rem 2rem;
//         font-size: 2rem;
//     }

//     button{
//         padding: 1rem 2rem;
//         font-size: 2rem;
//         background-color: tomato;
//         color: white;
//         cursor: pointer;
//         border: 2px solid white;
//     }


// }

// textarea{
//     /* border: 5px solid var(--primary-color); */

//     min-width: 100%;
//     max-width: 100%;
//     height: 400px;
//     padding: 1rem;
//     font-size: 1.8rem;  
//     font-family:"Poppins" ;
//     /* font-family:"montserrat" ; */
    
// }

// `








import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import getLocalities from "@/lib/request/getlocalities/getLocalities";

export default function SitemapGenPage() {
    const { cities, vendorCategories, venueCategories } = useGlobalContext();
    const [localities, setLocalities] = useState([]);
    const [count, setCount] = useState(0);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCat, setSelectedCat] = useState("");

    const [sitemapData, setSiteMapData] = useState("");
    const [venuesData, setVenuesData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);
    const [venueslistData, setVenuesListData] = useState([]);
    const [vendorslistData, setVendorsListData] = useState([]);

    const baseUrl = 'https://weddingbanquets.in';

    //  Fetch Venues Data Based on Selected City
    useEffect(() => {
        const fetchVenues = async () => {
            if (!selectedCity) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_venue/${selectedCity}`);
                const data = await response.json();
                setVenuesData(data.sitemap);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };
        fetchVenues();
    }, [selectedCity]);

    //  Fetch Vendors Data Based on Selected City
    useEffect(() => {
        const fetchVendors = async () => {
            if (!selectedCity) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_vendor/${selectedCity}`);
                const data = await response.json();
                setVendorsData(data.sitemap);
            } catch (error) {
                console.error("Error fetching vendors:", error);
            }
        };
        fetchVendors();
    }, [selectedCity]);

    //  Fetch Venue List Data Based on Selected City
    useEffect(() => {
        const fetchVenueslist = async () => {
            if (!selectedCity) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_location_venues/${selectedCity}`);
                const data = await response.json();
                setVenuesListData(data.sitemap);
            } catch (error) {
                console.error("Error fetching venue lists:", error);
            }
        };
        fetchVenueslist();
    }, [selectedCity]);

    //  Fetch Vendor List Data Based on Selected City
    useEffect(() => {
        const fetchVendorslist = async () => {
            if (!selectedCity) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/sitemap_location_vendor/${selectedCity}`);
                const data = await response.json();
                setVendorsListData(data.sitemap);
            } catch (error) {
                console.error("Error fetching vendor lists:", error);
            }
        };
        fetchVendorslist();
    }, [selectedCity]);

    //  Fetch Localities based on Selected City ID
    useEffect(() => {
        const fetchLocalities = async () => {
            if (!selectedCity) return;

            const response = await getLocalities(selectedCity);
            if (response.success) {
                setLocalities(response.data);
            } else {
                setLocalities([]);
            }
        };
        fetchLocalities();
    }, [selectedCity]);

    //  Utility Function for Current Date
    function getCurrentDateTime() {
        return new Date().toISOString();
    }

    //  Generate Sitemap
    const generateSitemap = async () => {
        let rawSitemap = "";

        if (!selectedCat) {
            alert("Select category");
            return;
        }

        //  Venue Sitemap
        if (selectedCat === "1") {
            venuesData.forEach(cat => {
                rawSitemap += `<url>
                    <loc>${baseUrl}/${cat.url}</loc>
                    <lastmod>${getCurrentDateTime()}</lastmod>
                    <priority>1.00</priority>
                </url>\n`;
            });
            setCount(venuesData.length);
        }

        //  Vendor Sitemap
        if (selectedCat === "2") {
            vendorsData.forEach(cat => {
                rawSitemap += `<url>
                    <loc>${baseUrl}/${cat.url}</loc>
                    <lastmod>${getCurrentDateTime()}</lastmod>
                    <priority>1.00</priority>
                </url>\n`;
            });
            setCount(vendorsData.length);
        }

        //  Venue List Sitemap
        if (selectedCat === "3") {
            venueslistData.forEach(cat => {
                rawSitemap += `<url>
                    <loc>${baseUrl}/${cat.url}</loc>
                    <lastmod>${getCurrentDateTime()}</lastmod>
                    <priority>1.00</priority>
                </url>\n`;
            });
            setCount(venueslistData.length);
        }

        //  Vendor List Sitemap
        if (selectedCat === "4") {
            vendorslistData.forEach(cat => {
                rawSitemap += `<url>
                    <loc>${baseUrl}/${cat.url}</loc>
                    <lastmod>${getCurrentDateTime()}</lastmod>
                    <priority>1.00</priority>
                </url>\n`;
            });
            setCount(vendorslistData.length);
        }

        setSiteMapData(rawSitemap);
    };

    return (
        <Wrapper className="section">
            <div className="container sitemap-container">
                <Heading text="Generate Sitemap" />
                <div className="sitemap-filter-container">
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="">Select City</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    
                    <select onChange={(e) => setSelectedCat(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="1">Venue</option>
                        <option value="2">Vendor</option>
                        <option value="3">Venue List</option>
                        <option value="4">Vendor List</option>
                    </select>

                    <button onClick={generateSitemap}>Generate</button>
                </div>
                <h2>Total Sitemap Generated: {count}</h2>
                <textarea value={sitemapData} readOnly />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
.sitemap-container{
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.sitemap-filter-container{

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    select{
        padding: 1rem 2rem;
        font-size: 2rem;
    }

    button{
        padding: 1rem 2rem;
        font-size: 2rem;
        background-color: tomato;
        color: white;
        cursor: pointer;
        border: 2px solid white;
    }


}

textarea{
    /* border: 5px solid var(--primary-color); */

    min-width: 100%;
    max-width: 100%;
    height: 400px;
    padding: 1rem;
    font-size: 1.8rem;  
    font-family:"Poppins" ;
    /* font-family:"montserrat" ; */
    
}

`