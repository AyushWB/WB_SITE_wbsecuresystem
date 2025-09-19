import styled from "styled-components";
import Image from "next/image";
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa'
import { AiFillCaretDown, AiFillCalendar, AiFillPhone, AiTwotoneMail, AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import { user_signup_validation } from "@/lib/formvalidation/formValidation";
import { Spinner1 } from "@/styles/components/spinner";
import OTPCard from "./OTPCard";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import getLocalities from "@/lib/request/getlocalities/getLocalities";
import Header from "@/components/layout.js/Header";
import Head from "next/head";

// import { FcGoogle } from 'react-icons/fc'
// import { FaFacebook } from 'react-icons/fa'

export default function SignUpPage() {

    const today = new Date().toISOString().split('T')[0];

    //------------------------------------------------------------ 
    // If user is already login then redirect to the dashboard
    const router = useRouter();
    const cookies = parseCookies()
    if (cookies["@UserApp"]) {
        router.push('/user/profile')
    }

    // -------------------------------------------------

    const { cities, setLoggedUser } = useGlobalContext();
    const [localities, setLocalities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPCard, setShowOTPCard] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    const formik = useFormik({
        initialValues: {
            name: '',
            email: "",
            password: "",
            phone: "",
            event_date: "",
            user_type: "0",
            city: "",
            location: ""
        },
        validate: user_signup_validation,

        //handleSubmit function will only run there is no error in formik.erros object.
        onSubmit: handleSignUp
    })

    //for localities data , when user change the city 
    useEffect(() => {
        async function fetchLocaties() {

            const response = await getLocalities(formik.values.city)

            if (response.success === true) {
                setLocalities(response.data)
            }
            else {

            }
        }

        fetchLocaties();
    }, [formik.values.city])


    // console.log(formik)

    const errorStyle = {
        borderColor: "red"
    }

    //submitHamdler
    async function handleSignUp(values) {

        // console.log(values)
        // console.log("Clicked")


        try {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/user/signup`;

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(values)
            })
            // console.log(response)

            response = await response.json();
            // console.log(response)
            if (response.success) {
                // console.log(response)
                setIsLoading(false)
                setShowOTPCard(true)


            } else {
                alert(response.message)
            }


        } catch (error) {
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            <Head>
                <title>Create Your Profile on Wedding Banquets Right Now.</title>
                <meta
                    name="description"
                    content="Join Wedding Banquets today! Make your profile, list all your services, and connect with engaged couples planning their dream wedding come true."
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
                <Header />
                <OTPCard data={{ showOTPCard: showOTPCard, setShowOTPCard, values: formik.values || {}, setLoggedUser }} />

                <div className="container">
                    {/* <Link href={"/"}>

                    <div className="logo-container">
                        <Image
                            src={'/logo.png'}
                            fill={true}
                            sizes="()"
                            alt="logo"
                        />

                    </div>

                </Link> */}

                    <div className="form-container">
                        <div className="img-banner">
                            <Image
                                src={"/common/signup-single.png"}
                                fill={true}
                                sizes="(100vw)"
                                alt="image"
                            />
                        </div>
                        <div className="form">
                            <Image
                                src={"/common/signup-single-flip.png"}
                                fill={true}
                                alt="image"
                                sizes="(100vw)"
                            />
                            <div className="form-items">

                                <div className="card">
                                    <div className="card-header">
                                        <h1 className="head-title">SignUp</h1>
                                        {/* <div className="google-facebook">

                                        <div className="facebook">
                                            <FcGoogle className="google-icon" />
                                        </div>
                                        <div className="google">
                                            <FaFacebook className="facebook-icon" />
                                        </div>
                                    </div>
                                    <p className="label">Or Signup with your email</p> */}
                                    </div>

                                    <div className="form-item" style={formik.errors.name && formik.touched.name ? errorStyle : {}}>
                                        <input type="text" placeholder="Your Full Name " name={"name"} {...formik.getFieldProps('name')} />
                                        <FaUser className="placeholder-icon" />
                                    </div>
                                    <div className="form-item" style={formik.errors.email && formik.touched.email ? errorStyle : {}}>
                                        <input type="email" placeholder="Email " name="email" {...formik.getFieldProps('email')} />
                                        <AiTwotoneMail className="placeholder-icon" />
                                    </div>
                                    <div className="form-item" style={formik.errors.password && formik.touched.password ? errorStyle : {}}>
                                        <input type={showPassword ? "text" : "password"} placeholder="Password " name="password" {...formik.getFieldProps('password')} />
                                        {showPassword ? <AiFillUnlock className="placeholder-icon" onClick={() => setShowPassword(false)} /> : <AiFillLock className="placeholder-icon" onClick={() => setShowPassword(true)} />}
                                    </div>
                                    <div className="form-item" style={formik.errors.phone && formik.touched.phone ? errorStyle : {}}>
                                        <input type="text" placeholder="Phone Number " name="phone" {...formik.getFieldProps('phone')} />
                                        <AiFillPhone className="placeholder-icon" />
                                    </div>
                                    <div className="form-item" style={formik.errors.event_date && formik.touched.event_date ? errorStyle : {}}>
                                        <input type="text" min={today} placeholder=' Event Date' onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} name="event_date" {...formik.getFieldProps('event_date')} />

                                        <AiFillCalendar className="placeholder-icon" />
                                    </div>
                                    <div className="form-item" style={formik.errors.city && formik.touched.city ? errorStyle : {}}>
                                        <div className="dropdown cities-dropdown">

                                            <select name="city" {...formik.getFieldProps('city')}>
                                                <option value="" >Select city</option>
                                                {
                                                    cities?.map((cities) => {
                                                        return (<option value={cities.slug} key={cities.id}>{cities.name}</option>)
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <AiFillCaretDown className="down-arrow" size={15} />
                                    </div>
                                    <div className="form-item" style={formik.errors.location && formik.touched.location ? errorStyle : {}}>
                                        <div className="dropdown locality-dropdown">

                                            <select name="location"  {...formik.getFieldProps("location")}>
                                                <option value="" >Select locality</option>
                                                {
                                                    localities?.map((locality) => {
                                                        return (<option value={locality.slug} key={locality.id}>{locality.name}</option>)
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <AiFillCaretDown className="down-arrow" size={15} />
                                    </div>

                                    <div className="">
                                        <h2 >I Am</h2>
                                        <div className="radio" style={{ color: "red" }}>
                                            <span><label htmlFor="groom" >Groom </label><input type="radio" checked={formik.values.user_type === "0"} name="user_type" value="0" onChange={formik.handleChange} id="groom" /></span>
                                            <span><label htmlFor="bride">Bride </label><input type="radio" name="user_type" value="1" onChange={formik.handleChange} id="bride" /></span>
                                            <span><label htmlFor="other">Other </label><input type="radio" name="user_type" value="2" onChange={formik.handleChange} id="other" /></span>

                                        </div>
                                    </div>
                                    <ButtonDark type="submit" onClick={formik.handleSubmit}>{isLoading ? <Spinner1 /> : "Signup"}</ButtonDark>
                                    {/* <button type="submit" onClick={formik.handleSubmit}>Submit</button> */}
                                    <div className="already-have-account">
                                        <h2>Already have an account? </h2> <Link href={'/user/signin'} className="btn">Log In</Link>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="section">

                        <section className="container">
                            <article>
                                <div className="contant">
                                    <p className="desc">
                                    Wedding Banquets is here to simplify all the process if you are planning a wedding by providing a great platform to find each and everything for your big day. Whether you are looking for a banquet hall, hotel, resort, farmhouse or a marriage garden, Wedding Banquets provides a large options for selecting the venues that can match your vision and budget without any problem.
                                    </p>

                                    <p className="desc">
                                    Apart from the venues, Wedding Banquets can also connect you with the top-grade weddding vendors. All of them can absolutely every moment with top professional photographers and look the best with the creative and talented makeup artists and you give a traditional touch with the creative mehendi artists.  Wedding Banquets is here to make your work easy with connecting all the professionals that can make your day.
                                    </p>

                                    <p className="desc">
                                    You can easily navigate all the venues and vendors like Photographers, makeup artists, mehendi artists, etc very quickly, All the services are available that you need. Plus stay updated about the latest trends going on Wedding Banquets.
                                    </p>

                                    <p className="desc">
                                    Wedding Banquets is here to make your dream come true that you are planning from a very long time about your wedding.
                                    </p>

                                    <p className="desc">
                                    Planning the wedding is never easy, it takes lot's of efforts and that's why we are hear to resolve everything. Connect with us right now!
                                    </p>
                                </div>
                            </article>

                        </section>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.section`

background-color: var(--bg-color);

/* .logo-container{ */
    /* width: 30rem; */
    /* height: 50px; */
    /* position: relative; */
    /* cursor: pointer; */
    /* margin: 4rem auto; */
    /* border: 1px solid red; */
/* } */

.form-container{
    display: grid;
    padding: 2rem 0rem 5rem 0;
    grid-template-columns:1fr 1fr;
    max-width: 120rem;
    margin: auto;

}

.img-banner{
    position: relative;
    height: 800px;
    width: auto;
    
}

.form{
    position: relative;
    height: 800px;
    
    .form-items{
        padding: 2rem;
        display: flex;
        width: 100%;
        height: 100%;
        /* border: 2px solid red; */
        position: absolute;
        /* color: white; */
        /* z-index: 111; */

        .card{
            background-color: white;
            width: 100%;
            height: 100%;
            padding: 5rem 7rem;
            display: flex;
            flex-direction: column;
            gap: 2.7rem;

            .card-header{
                text-align: center;
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .head-title{
                    color: black;
                    font-family: "Montserrat";
                    font-size: 2.5rem;
                    font-weight: 600;
                }
                .google-facebook{

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    background-color: white;


                    .google,.facebook{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        /* width: 40px;
                        height: 0px; */
                        background-color: white;
                        z-index: 1;
                        cursor: pointer;
                        

                        .google-icon,.facebook-icon{
                            font-size: 3rem;
                        }
                    }
                }

                .label{
                    color: var(--para);
                    font-family: "Poppins";
                    font-size: 1.8rem;
                    font-weight: 500;

                }
            }
           
            input,select,label{
                font-size: 1.8rem;
                font-family: "Poppins";
                border: none;
                color: var(--para);
                width: 95%;
                outline: none;
                padding: 1rem;
                font-weight: 500;
                background-color: transparent;
            }

            select{
                -moz-appearance:none;
                -webkit-appearance:none; 
                appearance:none; 
            }

            .placeholder-icon{
                color: var(--para);
                font-size: 2rem;
            }

            .form-item{
                border-bottom: 1px solid black;
                display: flex;
                align-items: center;
                /* justify-content: center; */

                .dropdown{
                    width: 100%;
                }
        
            }

            .radio{
                display: flex;
                gap: 2rem;
                
                span{
                    display: flex;
                }
            }
            
        }
    }

    .already-have-account{
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--para);
        justify-content: center;

        .btn{
            color: var(--primary-color);
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
        }
    }
}
    article{
    /* display: flex; */
    .desc{
        color: var(--para);
        font-family: "Poppins";
        font-size: 1.7rem;
        /* letter-spacing: 2px; */
        line-height: 1.9;
        word-spacing: 2px;
        font-weight: 500;


    }
    .contant{
        display: flex;
        flex-direction: column;
        justify-content:center;
        gap:2rem;
        padding: 3rem;
        font-size: 1.8rem;
        font-weight: 500;
    }
}

.header-article{
    /* border: 1px solid red; */
    display: flex;
    align-items: center;

    .desc{
        font-size: 1.8rem;
        font-weight: 500;
    }
}


@media (max-width:800px) {
    .form-container{
        grid-template-columns: 1fr;
    }

    .img-banner{

        display: none;
    
    }

    .card{
            
            padding: 5rem 3rem !important;
            display: flex;
            flex-direction: column;
            gap: 3rem;

    }
}

@media (max-width:600px) {
 
    .form{
        height: 700px;
    }
    
}

`