import styled from "styled-components";
import Heading from "../../miscellaneous/Heading";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import BlogCard from "@/components/blog/bloglist/blogcard/BlogCard";


function Blog({ posts }) {

    return (
        <Section className="section section-blog">
            <Heading text={"Wedding Blogs You Can’t Miss!"} desc={"Planning Your Dream Wedding? Wedding Banquets brings you the hottest trends in wedding decor, bridal fashion, photography, and beyond to ensure your big day is nothing short of magical !"} />
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