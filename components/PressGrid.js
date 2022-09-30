import styled, { css } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PressGridContainer = styled.section`
    display: flex;
    align-items; flex-start;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 6rem;
`
const PressTile = styled.div`
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
    @media only screen and (max-width:600px){
        & {width: 98%;}
    }
`
const PubTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`
const PressTitle = styled.p`
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
        <PressGridContainer>
            {
                posts && posts.map((post, index) => {         
                    return (
                            <PressTile key={index} className="fadein">
                                <a href={post.singlePress.externalLink} target="_blank" rel="noopener">
                                    <Image src={post.featuredImage.node.mediaItemUrl} width={500} height={436} alt={post.featuredImage.node.altText} layout="intrinsic" className="blogImage" />
                                </a>
                                <a href={post.singlePress.externalLink} target="_blank" rel="noopener">
                                    <PubTitle className="sans-serif xs-heading black uppercase">{post.singlePress.publicationName}</PubTitle>
                                    <PressTitle className="serif heading black">{post.title}</PressTitle>
                                </a>
                            </PressTile>
                            )
                    })
            }
        </PressGridContainer>
    )
}