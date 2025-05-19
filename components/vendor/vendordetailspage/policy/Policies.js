import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import PolicyCard from "@/components/venue/venuedetailspage/venuepolicy/PolicyCard";

export default function Policies() {


    return (<Wrapper className="section">
        <div className="container">
            <Heading text={"Vendor Policy"} />
            <div className="policies-container">
                <PolicyCard img_url={"/vpolicy/advance.png"} name={"Advance"} data={"40% at the time of booking"} />

                <PolicyCard img_url={"/vpolicy/cancellation.png"} name={"Cancellation"} data={`<div style="text-align: center;"><span>Non-cancellation</span></div>`} />

                <PolicyCard img_url={"/vpolicy/term.png"} name={"Terms"} data={`<div style="text-align: center; "><span>Outstation travel paid by client</span></div>`} />
            </div>
        </div>
    </Wrapper>)
}

const Wrapper = styled.section`

background-color: var(--bg-color);


.policies-container{

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    .policy{
        padding: 2rem 5rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        /* border: 2px solid var(--primary-color); */

        align-items: center;


        .policy-title{
            font-size: 2rem;
            color: var(--primary-color);
            font-weight: 500;

        }
        .policies-container{
            color: var(--para);
            font-size: 1.6rem;
            font-family: "Poppins";
            font-weight: 500;
            line-height: 2;
        }


    }
}
@media (max-width:1000px) {
    .policies-container{
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

}
`