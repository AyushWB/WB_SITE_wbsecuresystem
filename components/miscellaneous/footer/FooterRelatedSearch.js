import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import { useRouter } from 'next/router';

function FooterRelatedSearch({ city, locality }) {
    const router = useRouter();

    const currentSlug = router.asPath.split('/')[1];

    const venue_categories = [
        { id: 3, name: "Banquet Halls", slug: "banquet-halls" },
        { id: 4, name: "Marriage Gardens", slug: "marriage-gardens" },
        { id: 5, name: "Wedding Farmhouse", slug: "wedding-farmhouse" },
        { id: 6, name: "Party Halls", slug: "party-halls" },
        { id: 7, name: "5 Star Wedding Hotels", slug: "5-star-wedding-hotels" },
        { id: 11, name: "Small Function Halls", slug: "small-function-halls" },
        { id: 13, name: "Corporate Events", slug: "corporate-events" },
        { id: 14, name: "Destination Weddings", slug: "destination-weddings" },
    ];

    const filteredCategories = venue_categories.filter(cat => cat.slug !== currentSlug);

    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Other Popular Searches</h2>
                <div className="vendors-container">
                    <div className="vendors-list">
                        {
                            filteredCategories.map((cat) => {
                                // 👇 override link target if category is small-function-halls or corporate-events
                                const targetSlug =
                                    (cat.slug === "small-function-halls" || cat.slug === "corporate-events")
                                        ? "banquet-halls"
                                        : cat.slug;

                                return (
                                    <span key={cat.id}>
                                        <Link
                                            className='vendor-link'
                                            href={`/${targetSlug}/${city}/${locality}`}
                                        >
                                            {`${cat.name} in ${locality === "all" ? city : locality}`}
                                        </Link>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
margin-top: 2rem;
.vendors-heading{
    font-size: 2rem;
    letter-spacing: 1px;
}
.vendors-container{
    padding: 1rem 0rem;
    .vendors-title{
        font-family: Poppins;
        font-size: 1.8rem;
    }
    .vendors-list{
        padding: 2rem 0rem;
        
        span:not(:last-child)::after {
            content: "|";
            padding: 0 10px;
            opacity: .54;
            color: black;
            font-size: 1.5rem;
        }

        .vendor-link{
            line-height: 3rem;
            font-family: "Poppins";
            margin-bottom: 10px;
            font-size:1.5rem;
            cursor: pointer;
            transition: all .3s linear;
            color: var(--para);
            white-space: normal;
            overflow-wrap: break-word;

            &:hover{
                color: red;
            }
        }
    }
}
`

export default FooterRelatedSearch
