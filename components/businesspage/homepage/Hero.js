import styled from "styled-components";
import Image from "next/image";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script"; 

export default function Hero() {
  return (
    <>
      <Head>
        <title>Connect with WeddingBanquets to grow your wedding business, connect with many individuals, and increase your visibility and clarity in the wedding industry.</title>
        <meta
          name="description"
          content="Learn about Wedding Banquets and how it helps you plan weddings and events with top venues vendors like makeup artists, photographers, mehendi artists and more."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Script
        id="wedding-banquet-schema-businesspage-hero"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wedding Banquets",
            "url": "https://www.weddingbanquets.in",
            "logo": "https://www.weddingbanquets.in/logo.png",
            "sameAs": [
              "https://www.instagram.com/weddingbanquets",
              "https://www.facebook.com/weddingbanquets"
            ],
            "description":
              "Wedding Banquets connects couples with trusted venues and vendors across India. Discover, compare, and book from 50,000+ listings."
          })
        }}
      />
        <Wrapper className="section">
            <div className="hero-container">
                <div className="hero-content">
                    <Link href={"/"}>
                        <div className="logo-container">
                            <Image
                                src={'/logo.png'}
                                fill={true}
                                sizes="(100vw)"
                                alt="logo"
                            />

                        </div>
                    </Link>
                    <h1 className="hero-title">TAKE YOUR BUSINESS TO NEXT LEVEL WITH WEDDING BANQUETS </h1>
                    <ul className="hero-lists">
                        <li className="hero-list">Promote your services on our best in business site.</li>
                        <li className="hero-list"> Commute to local engaged couples and book more weddings</li>
                        <li className="hero-list"> Trusted by over 10,000 professionals. </li>
                    </ul>
                    <Link href={"/business/signup"}><ButtonDark>Signup</ButtonDark></Link>

                </div>
                <div className="hero-banner">
                    <Image
                        src={"/business/vendor_hero.png"}
                        alt="hero-img"
                        fill={true}
                        sizes="(100vw)"
                    />

                </div>
            </div>

        </Wrapper>
        </>
    )
}

const Wrapper = styled.section`

/* background-color: var(--bg-color); */
background-color:rgb(239,239,239);


.hero-container{
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.logo-container{
    width: 25rem;
    height: 50px;
    cursor: pointer;
    position: relative;
    /* margin: 4rem auto; */
    /* border: 1px solid red; */
}

.hero-content{
    /* border: 1px solid red; */
    padding: 5rem 8rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    max-width: 80rem;

    .hero-title{
        color: var(--primary-color);
        font-size: 3rem;
        font-family: "Montserrat";
        font-weight: 600;

    }
    .hero-lists{
        color: var(--para);
        display: flex;
        flex-direction: column;
        gap: .5rem;

        .hero-list{
            list-style:disc !important;
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 400;
        }
    }

}
.hero-banner{
    height: 400px;
    /* border: 2px solid blue; */
    position: relative;

}

@media (max-width:1000px) {
    .hero-container{
    display: grid;
    grid-template-columns: 1fr;

}

.hero-banner{
    height: 300px;
    /* border: 2px solid blue; */
    position: relative;

}
    
}

@media (max-width:800px) {

.hero-content{
    /* border: 1px solid red; */
    padding: 5rem;
}
    
    
}
`