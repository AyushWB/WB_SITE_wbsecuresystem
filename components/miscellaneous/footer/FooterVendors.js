import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '@/context/MyContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

function FooterVendors() {
    const { selectedCity } = useGlobalContext();
    const router = useRouter();

    const currentSlug = router.asPath.split('/')[1];

    const venue_categoriesServices = [
        { id: 15, name: "Wedding Photographers", slug: "wedding-photographers" },
        { id: 16, name: "Makeup Artists", slug: "makeup-artists" },
        { id: 17, name: "Mehndi Artists", slug: "best-mehendi-artists" },
        { id: 18, name: "Wedding Decorators", slug: "wedding-decorators" },
        { id: 19, name: "Wedding Invitation Cards", slug: "wedding-invitation-card" },
        { id: 20, name: "Choreographers", slug: "wedding-choreographer" },
        { id: 21, name: "Wedding Band", slug: "wedding-band" },
        { id: 22, name: "Wedding Transportation Vintage Cars", slug: "wedding-transportation-vintage-cars" },
        { id: 23, name: "Bridal Outfits", slug: "bridal-outfits" },
        { id: 24, name: "Groom Outfits", slug: "groom-outfits" }
    ];

    const filteredCategories = venue_categoriesServices.filter(cat => cat.slug !== currentSlug);

    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Other Wedding Services</h2>
                <div className="vendors-container">
                    <div className="vendors-list">
                        {filteredCategories.map((cat) => (
                            <span key={cat.id}>
                                <Link
                                    className='vendor-link'
                                    href={`/${cat.slug}/${selectedCity}/all`}
                                >
                                    {`${cat.name} in ${selectedCity}`}
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

const Section = styled.section`
margin-top: 2rem;
.vendors-heading {
    font-size: 2rem;
    letter-spacing: 1px;
}
.vendors-container {
    padding: 1rem 0rem;
    .vendors-title {
        font-family: Poppins;
        font-size: 1.8rem;
    }
    .vendors-list {
        padding: 2rem 0rem; 

        span:not(:last-child)::after {
            content: "|";
            padding: 0 10px;
            opacity: 0.54;
            color: black;
            font-size: 1.5rem;
        }

        .vendor-link {
            line-height: 3rem;
            font-family: "Poppins";
            margin-bottom: 10px;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s linear;
            color: var(--para);
            white-space: normal;
            overflow-wrap: break-word;

            &:hover {
                color: red;
            }
        }
    }
}
`;

export default FooterVendors;