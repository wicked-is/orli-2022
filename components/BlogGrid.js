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

const BlogTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`

const BlogTile = styled.div`
    display: inline;

    /* grid-column-end: 5; */

    & img.blogImage {
        cursor: pointer;
    }

    & img.blogImage:hover p.heading {
        color: var(--brown) !important;
    }

    &:first-child,
    &:nth-child(1n + 3) {
        width: 27.33%;
        margin: 0.5rem 0.5rem 0.5rem 5rem;
        position: relative;
    }

    &:first-child p.heading:hover,
    &:nth-child(1n + 3) p.heading:hover,
    &:nth-child(2) p.heading:hover,
    &:nth-child(2n) p.heading:hover {
        color: var(--brown);
    }

    &:nth-child(2),
    &:nth-child(2n) {
        width: 27.33%;
        margin: 0.5rem;
        position: relative;
    }

    &:nth-child(3),
    &:nth-child(3n + 4) {
        width: 27.33%;
        margin: 0.5rem 5rem 0.5rem 0.5rem;
        position: relative;
    }

    @media only screen and (max-width:1074px) {
        &:first-child,
        &:nth-child(1n + 3) {
            width: 26.33%;
            margin: 0.5rem 0.5rem 0.5rem 5rem;
        }

        &:nth-child(2),
        &:nth-child(2n) {
            width: 26.33%;
            margin: 0.5rem;
        }

        &:nth-child(3),
        &:nth-child(3n + 4) {
            width: 26.33%;
            margin: 0.5rem 5rem 0.5rem 0.5rem;
        }
    }

    @media only screen and (max-width:913px) {
        &:first-child,
        &:nth-child(1n + 3) {
            width: 43%;
            margin: 1rem 0.5rem 1rem 1rem;
        }
        &:nth-child(2),
        &:nth-child(2n) {
            width: 43%;
            margin: 1rem 1rem 1rem 0.5rem;
        }
        &:nth-child(3),
        &:nth-child(3n + 4) {
            width: 90%;
            margin: 1rem;
        }
    }
    @media only screen and (max-width:768px) {
        &:nth-child(3n + 4) {
            width: 90%;
            margin: 1rem;
            padding: 4rem calc(5% + .5rem);
        }
    }
    @media only screen and (max-width:414px) {
        &:first-child,
        &:nth-child(1n + 3) {
            width: 98%;
            margin: 1rem;
        }
        &:nth-child(2),
        &:nth-child(2n) {
            width: 98%;
            margin: 1rem;
        }
        &:nth-child(3),
        &:nth-child(3n + 4) {
            width: 98%;
            margin: 1rem;
        }
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
`

export default function BlogGrid(props) {

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
                            <Link href={post.uri}>
                                <Image src={post.featuredImage.node.mediaItemUrl} width={500} height={436} layout="intrinsic" alt={post.featuredImage.node.altText} className="blogImage" />
                            </Link>
                            { !featured && ( <p className="xs-heading uppercase black">{category}</p> ) }
                            <Link href={post.uri}>
                            <BlogTitle className="serif heading black">{post.title}</BlogTitle>
                            </Link>
                            </BlogTile>
                    )
                })
            }
        </BlogGridContainer>
    )
}