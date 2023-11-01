import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styled, { css } from "styled-components";

const ImageThreeUpContainer = styled.section`
    width: 100%;
    position: relative;

    &.paddingtop {padding: 6rem 0 0 0;}
    &.paddingtopsides {padding: 6rem 6rem 0 6rem;}
    &.paddingtopbottom {padding: 6rem 0rem;}
    &.paddingsidesbottom {padding: 0rem 6rem 6rem 6rem;}
    &.paddingall {padding: 6rem;}

    & h2 {
        font-family: essonnes-display, serif;
        font-weight: 400;
        font-style: normal;
        font-size: var(--heading);
        color: var(--black);
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

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    @media only screen and (max-width: 600px){
        & {
            flex-direction: column;
        }
    }
`;

const SingleImage = styled.div``;

export default function ImagesThreeUp(props) {
    const { 
        anchor,
        paddingOptions,
        heading,
        imageRepeater,
    } = props;

    return (
        <ImageThreeUpContainer className={paddingOptions}>
            {heading && <h2 className="center">{heading}</h2>}
            <ImageContainer>
            {imageRepeater &&
					imageRepeater.map((images, index) => {
						return (
                            <SingleImage
								className="singlegift"
								id={`images-${index + 1}`}
								key={`images-${index + 1}`}>
                                {images.link ? (
                                    <Link href={images.link} target="_blank">
                                        <Image
                                            src={images.image.mediaItemUrl}
                                            alt={images.image.altText}
                                            width={302}
                                            height={269} />
                                    </Link>
                                ) : <Image
                                    src={images.image.mediaItemUrl}
                                    alt={images.image.altText}
                                    width={302}
                                    height={269} />
                                }
                                </SingleImage>
                        )
                    }
                )
            }
            </ImageContainer>
        </ImageThreeUpContainer>
    )
}