import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styled, { css } from "styled-components";

const ImageContentContainer = styled.section`
    width: 100%;
    position: relative;
    max-width: 80%;
    display: block;
    margin: auto;

    &.paddingtop {padding: 6rem 0 0 0;}
    &.paddingbottom {padding: 0rem 0 6rem 0;}
    &.paddingtopbottom {padding: 6rem 0rem;}
    &.paddingall {padding: 6rem;}

    & h2 {
        font-family: essonnes-display, serif;
        font-weight: 400;
        font-style: normal;
        font-size: var(--heading);
        color: var(--black);
        margin-block-start: 0em;
        margin-block-end: 3rem;
        line-height: 1.2;
    }

    & h3 {
        font-size: var(--sub-heading);
        letter-spacing: var(--letter-spacing);
        text-transform: uppercase;
    }

    @media only screen and (max-width: 820px){
        &.paddingtopsides {padding: 6rem 4rem 0 4rem;}
        &.paddingsidesbottom {padding: 0rem 4rem 6rem 4rem;}
        &.paddingall {padding: 6rem 4rem;}
    }
    @media only screen and (max-width: 600px){
        &.paddingtopsides {padding: 6rem 2rem 0 2rem;}
        &.paddingsidesbottom {padding: 0rem 2rem 6rem 2rem;}
        &.paddingall {padding: 6rem 2rem;}
    }
`;

const InnerContainer = styled.ul`
    list-style: none;
    display: block;
    width: 100%;
    position: relative;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
`;

const MediaContent = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4rem;
    padding-bottom: 4rem;

    .content {
        width: calc(70% - 2rem);
    }
    .content h2 {
        font-size: var(--sub-heading);
        letter-spacing: var(--letter-spacing);
        text-transform: uppercase;
        font-family: "GT Walsheim Bold";
        margin-block-start: 0em;
        margin-block-end: 1rem;
    }

    .content h3 {
        font-family: essonnes-display,serif;
        font-weight: 400;
        font-style: normal;
        font-size: clamp(1.5rem, 2vw, 2rem);
        letter-spacing: 0;
        text-transform: none;
        color: var(--black);
        margin-block-start: 0em;
        margin-block-end: 1rem;
        line-height: 1.2;
    }

    .content p {
        font-size: var(--body-copy);
        font-family: "GT Walsheim Light";
        line-height: 150%;
        color: var(--black);
    }
    .content a {
        font-size: var(--body-copy);
        font-family: "GT Walsheim Light";
        line-height: 150%;
        color: var(--black);
        text-decoration: underline;
        transition: all 0.3s ease-in-out;
    }
    .content a:hover {
        color: var(--brown);
    }
    .imageContainer {
        width: calc(30% - 2rem);
        position: relative;
    }

    .imageContainer a {
        width: 100%;
        position: relative;
    }

    .imageContainer img,
    .imageContainer a img {
        width: 100%;
        height: auto;
        max-width: 100%;
    }

    @media only screen and (max-width: 1024px){
        flex-direction: column-reverse;
        gap: 0;

        .imageContainer,
        .content {
            width: 100%;
        }
        .imageContainer {padding: 0 0 2rem 0;}
    }
`;

export default function ImageContentRepeater(props) {
    const { 
        anchor,
        paddingOptions,
        heading,
        smallHeading,
        repeater
    } = props;

    return (
        <ImageContentContainer className={paddingOptions}>
            {smallHeading && <h3 className="sans-serif-bold left">{smallHeading}</h3>}
            {heading && <h2 className="left">{heading}</h2>}
            <InnerContainer>
            {repeater &&
					repeater.map((item, index) => {
						return (
                            <MediaContent
								id={`images-${index}`}
								key={`images-${index}`}>
                                <div className="content">
                                    {item.title && <h2 className="sans-serif left">{item.title}</h2>}
                                    {item.subheading && <h3 className="serif left">{item.subheading}</h3>}
                                    {item.content && <p>{item.content}</p>}
                                    {item.link && <Link href={item.link} target="_blank">Learn More</Link>}
                                </div>
                                <div className="imageContainer">
                                {item.link ? (
                                    <Link href={item.link} target="_blank">
                                        <Image
                                            src={item.image.mediaItemUrl}
                                            alt={item.image.altText}
                                            width={302}
                                            height={269} 
                                            layout="responsive"/>
                                    </Link>
                                ) : <Image
                                    src={item.image.mediaItemUrl}
                                    alt={item.image.altText}
                                    width={302}
                                    height={269}
                                    layout="responsive" />
                                }
                                </div>
                                </MediaContent>
                        )
                    }
                )
            }
            </InnerContainer>
        </ImageContentContainer>
    )
}