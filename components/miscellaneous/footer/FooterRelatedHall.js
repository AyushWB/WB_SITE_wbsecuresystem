import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';

function FooterRelatedHall({city,locality}) {



    const venue_categorieshall = [
        {
            "id": 15,
            "name": "Wedding Photographers",
            "slug": "wedding-photographers"
        },
        {
            "id": 16,
            "name": "Makeup Artists",
            "slug": "makeup-artists"
        },
        {
            "id": 17,
            "name": "Mehendi Artists",
            "slug": "best-mehendi-artists"
        },
        {
            "id": 18,
            "name": "Decorators",
            "slug": "wedding-decorators"
        },
        {
            "id": 19,
            "name": "Invitation Cards",
            "slug": "wedding-invitation-card"
        },
        {
            "id": 20,
            "name": "Choreographers",
            "slug": "wedding-choreographer"
        },
        {
            "id": 21,
            "name": "Wedding Band",
            "slug": "wedding-band"
        },
        {
            "id": 22,
            "name": "Wedding Transportation",
            "slug": "wedding-transportation-vintage-cars"
        },
        {
            "id": 23,
            "name": "Bridal Wear",
            "slug": "bridal-outfits"
        },
        {
            "id": 24,
            "name": "Groom Wear",
            "slug": "groom-outfits"
        }
    ]


    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Other Wedding Services</h2>
                <div className="vendors-container">
                    <div className="vendors-list">
                        {
                            venue_categorieshall?.map((cat) => {
                                return (
                                    <span key={cat.id}>
                                        <Link className='vendor-link' href={`/${cat.slug}/${city}/${locality}`}>
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

            &::after{
                content: "|";
                padding: 0 10px;
                opacity: .54;
                color: black;
            }

        }
    }
}

`



export default FooterRelatedHall