import styled from "styled-components";
import Image from "next/image";
import Head from "next/head";

export default function HeroBanner() {


    return (
        <>
            <Head>
                <title>Work with Wedding Banquets & Let's Grow Together.</title>
                <meta
                    name="description"
                    content="Find the job opportunities at Wedding Banquets and be a part of growing and skilled team making wedding planning easier and more exciting across India."
                />
                <meta name="robots" content="index, follow" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Wedding Banquets",
                            "url": "https://www.weddingbanquets.in",
                            "logo": "https://www.weddingbanquets.in/logo.webp",
                            "sameAs": [
                                "https://www.instagram.com/weddingbanquets",
                                "https://www.facebook.com/weddingbanquets"
                            ],
                            "description":
                                "Wedding Banquets connects couples with trusted venues and vendors across India. Discover, compare, and book from 50,000+ listings."
                        })
                    }}
                />
            </Head>

            <Wrapper>

                <Image src={'/career/23.png'} alt="icon" fill sizes="(100vw)" />
                <div className="overlay">
                </div>
                <div className="overlay-content">
                    <h1>Wedding Banquets Careers</h1>
                    <p>Come and create something extraordinary together.</p>
                </div>
            </Wrapper>
        </>
    )
}


const Wrapper = styled.section`
position: relative;
height: 500px;


.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .4;

}
.overlay-content{
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: .5rem;

    /* width: 100%;
    height: 100%; */
    /* z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center; */

    h1{
        color: white;
        font-family: "montserrat";
        font-size: 5rem;
        font-weight: 600;
    }
    p{
        color: white;
        font-family: "Poppins";
        font-size: 2rem;
        font-weight: 400;
    }
    
}


@media (max-width:100px) {

    height: 350px;
    
}
@media (max-width:800px) {

    height: 250px;
    
}
@media (max-width:600px) {
    height: 200px;

    .overlay-content{
   

    h2{
        font-size: 3rem;
    }
    p{
        
        text-align: center;
        font-size: 1.7;
    }
    
}
    
}
`