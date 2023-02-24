import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styled, { css } from "styled-components";


const FullWidthContainer = styled.section`
    display: inline-block;
    width: 100%;
    margin: auto;
`
const InnerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 820px) {
        &{flex-direction: column;}
    }
`
const LargeMedia = styled.div`
    width: 50%;
    position: relative;
    overflow: hidden;
    text-align: center;

    & span:nth-child(1) {
        padding-top: 56.25% !important;
    }
    & img.auto {
        width: 100% !important; 
        max-width: 100% !important; 
        height: auto !important;
        max-height: unset !important;
        min-height: unset !important;
    }

    & .videocontainer {
        margin-top: 3rem;
        -webkit-aspect-ratio: 1/1.2;
        -moz-aspect-ratio: 1/1.2; 
        -o-aspect-ratio: 1/1.2;
        overflow: hidden;
        height 70vh;
    }
    
    & .videocontainer video {
        max-width: 100%;
        position: relative;
    }
    @media only screen and (max-width: 820px) {
        & {width: 100%;}
    }
`

const Caption = styled.p`
    width: 100%;
    margin: auto;
    display: block;
    color: var(--black);
    text-align: left;
    padding: 1rem 2rem 0rem 2rem;   
`

const SmallMedia = styled.div`
    width: 50%;
    position: relative;
    overflow: hidden; 
    text-align: center;

    .smallmedialeft {padding: 0 4rem 0 0;}
    .smallmediaright {padding: 0 0rem 0 4rem;}

    & img.auto {
        width: 100% !important; 
        max-width: 100% !important; 
        height: auto !important;
        max-height: unset !important;
        min-height: unset !important;
    }

    & .videocontainer {
        margin-top: 3rem;
        -webkit-aspect-ratio: 1/1.2;
        -moz-aspect-ratio: 1/1.2; 
        -o-aspect-ratio: 1/1.2;
        height: 70vh;
        overflow: hidden;
    }
    
    & .videocontainer video {
        max-width: 100%;
        position: relative;
    }

    @media only screen and (max-width: 820px) {
        &{width: 100%;}

        .smallmedialeft {padding: 0 0rem 2rem 0;}
        .smallmediaright {padding: 2rem 0rem 0 0rem;}
    }
`

export default function MediaTwoUp(props) {
    const { 
        layout,
        paddingType,
        anchorTag,
        leftMediaType,
        imagePosterLeft,
        videoLeft,
        captionLeft,
        rightMediaType,
        imagePosterRight,
        videoRight,
        captionRight
    } = props;

    const mediaTwoUpStructure = (layout) => {
        switch (layout) {
            case 'Large Media Left':
                return (
                    <InnerContainer>
                        <LargeMedia>
                            {videoLeft && (
                                    <video className="videocontainer" autoPlay playsInline muted loop>
                                        <source src={videoLeft} type="video/mp4" />
                                    </video>
                            )}
                            {imagePosterLeft &&(
                                    <Image src={imagePosterLeft.mediaItemUrl} alt={imagePosterLeft.altText}
                                    width={1200}
                                    height={900}
                                    layout="responsive"
                                    className="auto" />
                            )}
                            {captionLeft && (
                                <Caption className="sans-serif">{captionLeft}</Caption>
                            )}
                        </LargeMedia>
                        <SmallMedia> <div className="smallmediaright">
                            {videoRight && (
                                    <video className="videocontainer" autoPlay playsInline muted loop>
                                        <source src={videoRight} type="video/mp4" />
                                    </video>
                            )}
                            {imagePosterRight &&(
                                    <Image src={imagePosterRight.mediaItemUrl} alt={imagePosterRight.altText} 
                                    width={1200}
                                    height={900}
                                    layout="responsive"
                                    className="auto" />
                            )}
                            {captionRight && (
                                <Caption className="sans-serif">{captionRight}</Caption>
                            )}
                        </div></SmallMedia>
                    </InnerContainer>
                )
            case 'Large Media Right':
                    return (
                        <InnerContainer>
                            <SmallMedia lassName="smallmedialeft">
                                {videoLeft && (
                                    <video className="videocontainer" autoPlay playsInline muted loop>
                                        <source src={videoLeft} type="video/mp4" />
                                    </video>
                                )}
                                {imagePosterLeft &&(
                                    <Image src={imagePosterLeft.mediaItemUrl} alt={imagePosterLeft.altText}/>
                                )}
                                {captionLeft && (
                                    <Caption className="sans-serif">{captionLeft}</Caption>
                                )}
                            </SmallMedia>
                            <LargeMedia>
                                {videoRight && (
                                    <video className="videocontainer" autoPlay playsInline muted loop>
                                        <source src={videoRight} type="video/mp4" />
                                    </video>
                                )}
                                {imagePosterRight &&(
                                    <Image src={imagePosterRight.mediaItemUrl} alt={imagePosterRight.altText}/>
                                )}
                                {captionRight && (
                                    <Caption className="sans-serif">{captionRight}</Caption>
                                )}
                            </LargeMedia>
                        </InnerContainer>
                    )
                    default:
                    return null;
                }
            }
        
            return (
                <FullWidthContainer className={paddingType}>
                    { mediaTwoUpStructure(layout) }
                </FullWidthContainer>
            )
}