import styled from "styled-components";
import Heading from "../../miscellaneous/Heading";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import BlogCard from "@/components/blog/bloglist/blogcard/BlogCard";


function Blog({ posts }) {

    return (
        <Section className="section section-blog">
            <Heading text={"Take a cue - Trending Blogs"} desc={"Looking for Wedding Inspiration? Put a full stop to your search as Wedding Banquets has got your back! Keep up to date with the hot trends on Wedding decor, Fashion inspirations, Photography and much more to make your D-Day a phenomenal affair.. "} />
            <div className="container">
                <div className="blog-cards">

                    {
                        posts?.map((post, index) => {
                            return (<BlogCard key={index} {...post} />)
                        })
                    }

                </div>
                <div className="btn">
                    <Link href={"https://weddingbanquets.in/blog"}>
                        <ButtonDark>
                            View All
                        </ButtonDark>
                    </Link>
                </div>
            </div>
        </Section>
    )
}

export default Blog;

const Section = styled.section`

.blog-cards{
    display: grid;
    grid-template-columns:1fr 1fr 1fr;
    text-align: center;
    overflow-x: auto;
    gap:3rem;
    &::-webkit-scrollbar { width: 0 !important }
    @media(max-width: 786px){
    gap: -1rem;
}
}

.btn{
    margin-top:4rem;
    text-align:center;
}
.BlogCard__Card-sc-124a0749-0{
width: 390px !important;
@media(max-width: 786px){
    width: 350px !important;
        margin-left: 8px;
    }
}

`