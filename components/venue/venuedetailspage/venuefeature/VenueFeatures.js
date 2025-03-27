import Heading from '@/components/miscellaneous/Heading'
import React from 'react'
import styled from 'styled-components'
import FeaturesCard from './FeaturesCard'


export default function VenueFeatures({venue}) {


    let featureText = '';
    if (venue.nonveg_price && venue.nonveg_price > 0){
        featureText = 'Serves Vegetarian and Non-vegetarian meals';
    }else{
        featureText = 'Serves Vegetarian meals only';
    }

    // console.log("Venue Data:", venue);

    //   let airportText = venue.airport_distance
    //     ? `${venue.airport_distance} away from ${venue.airport_name || 'the nearest airport'}`
    //     : "30 mins away from Indira Gandhi International Airport";

    return (
        <Section>
            <div className="container">
                <Heading text={"Features Of Venue"} />
                <div className="features-card-container">
                    <FeaturesCard img_url={"/vfeature/staff.png"} data={"Lovely and humble staff"}/>
                    <FeaturesCard img_url={"/vfeature/food.png"} data={featureText}/>
                    <FeaturesCard img_url={"/vfeature/nearby.png"} data={"30 mins away from Indira Gandhi International Airport"}/>
                    <FeaturesCard img_url={"/vfeature/parking.png"} data={"Ample parking space plus valet"}/>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
padding: 1rem 0rem;
background: var(--bg-color);
.features-card-container{
    padding: 1.5rem 0rem;
    display: grid;
    /* align-items: start; */
    justify-content: start;
    grid-template-columns: repeat(4,1fr);
    gap: 5rem;
}


@media (max-width:950px) {
    .features-card-container{
        padding: 1.5rem 0rem;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 5rem;
    }
    
}
`