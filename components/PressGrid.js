import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PressGridContainer = styled.section`
    width: calc(100% / 6rem);
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: left;
    margin: auto 6rem 6rem 6rem;
    @media only screen and (max-width: 831px) {
        & {
            width: calc(100% / 4rem);
            margin: auto 4rem 6rem 4rem;
        }
    }
`;

const PressTile = styled.div`
    display: inline;
    width: 30.33%;
    margin: 0.5rem 1rem 3rem 1rem;
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

    ${props =>
        props.featured &&
        css`
            display: block;
            min-height: 70vh;
            width: 100% !important;
            background-image: url(${props.background}) !important;
            background-size: cover !important;
            -webkit-background-size: cover !important;
            -moz-background-size: cover !important;
            -o-background-size: cover !important;
            background-position: center center;
            background-repeat: no-repeat !important;
            margin: 8rem 0 !important;
            padding: 4rem 6rem;
            cursor: pointer;

            img,
            span {
                display: none !important;
            }
            p {
                color: #fff;
            }
            & p.heading:hover {
                color: #fff !important;
            }
        `}
    @media only screen and (max-width:1257px) {
        & {
            width: 29.33%;
        }
    }
    @media only screen and (max-width: 991px) {
        & {
            width: 45%;
        }
    }
    @media only screen and (max-width: 767px) {
        & {
            width: 100%;
            margin: 0 0 3rem 0;
        }
    }
`;

const PubTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`;

const PressTitle = styled.p`
    cursor: pointer;
    transition: 0.3s ease all;
`;

export default function PressGrid(props) {
    const { posts } = props;

    useEffect(() => {
        var sections = gsap.utils.toArray(".fadeinpress");

        sections.forEach(section => {
            gsap.to(section, {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse",
                },
            });
        });
    }, []);
    return (
        <PressGridContainer>
            {posts &&
                posts.map((post, index) => {
                    return (
                        <PressTile
                            key={`${index}${post.slug}`}
                            className="fadeinpress">
                            <a
                                target="_blank"
                                href={post.singlePress.externalLink}
                                rel="noreferrer noopener">
                                <Image
                                    src={post.featuredImage.node.mediaItemUrl}
                                    width={500}
                                    height={400}
                                    alt={post.featuredImage.node.altText}
                                    layout="responsive"
                                    className="blogImage"
                                />
                            </a>
                            <a
                                target="_blank"
                                href={post.singlePress.externalLink}
                                rel="noreferrer noopener">
                                <PubTitle className="sans-serif xs-heading black uppercase">
                                    {post.singlePress.publicationName}
                                </PubTitle>
                                <PressTitle className="serif heading black">
                                    {post.title}
                                </PressTitle>
                            </a>
                        </PressTile>
                    );
                })}
        </PressGridContainer>
    );
}
