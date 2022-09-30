import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BlogGridContainer = styled.section`
    display: flex;
    align-items; flex-start;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 6rem;
`

const BlogTile = styled.div`
    display: inline;
    width: 27.33%;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    position: relative;

    & img.blogImage {
        cursor: pointer;
    }

    & img.blogImage:hover p.heading {
        color: var(--brown) !important;
    }

    & p.heading:hover {
        color: var(--brown);
    }

    ${props => props.featured && css`
        display: block;
        min-height: 70vh;
        width: 100% !important;
        background-image: url(${props.background}) !important;
        background-size: cover !important;
        -webkit-background-size: cover !important;
        -moz-background-size: cover !important;
        -o-background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        margin: 8rem 0 !important;
        padding: 4rem 6rem;
        cursor: pointer;

        img, span { display: none !important; }
        p { color: #fff; }
        & p.heading:hover {color: #fff !important;}
    `}
    @media only screen and (max-width:600px){
        & {width: 98%;}
    }
`

const PubTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`

const BlogTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`

export default function PressGrid(props) {

    const { posts } = props;

    useEffect(() => {
        var sections = gsap.utils.toArray('.fadein');

        sections.forEach((section) => {
            gsap.to(section, { autoAlpha: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse"
                }
            });
        });

    },[])
    return (
        <BlogGridContainer>
            {
                posts && posts.map((post, index) => {
                    
                    const featured = post.blogPost.featured === null ?
                        false :
                        post.blogPost.featured;                 
                    const category = post.categories.nodes[0].name;

                    return (
                            <BlogTile key={index} className="fadein" featured={featured} background={post.featuredImage.node.mediaItemUrl}>
                            { featured && ( <p className="xs-heading uppercase white">{category}</p> ) }
                            <Link href={post.singlePress.externallink} target="_blank" rel="noopener">
                                <Image src={post.featuredImage.node.mediaItemUrl} width={500} height={436} layout="intrinsic" alt={post.featuredImage.node.altText} className="blogImage" />
                            </Link>
                            { !featured && ( <p className="xs-heading uppercase black">{category}</p> ) }
                            <Link href={post.singlePress.externallink} target="_blank" rel="noopener">
                                <PubTitle className="sans-serif xs-heading black uppercase">{post.singlePress.publicationName}</PubTitle>
                                <BlogTitle className="serif heading black">{post.title}</BlogTitle>
                            </Link>
                            </BlogTile>
                    )
                })
            }
        </BlogGridContainer>
    )
}