import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

const FullWidthContainer = styled.section`
    display: inline-block;
    width: 100%;
    margin: auto;
    position: relative;
`;
const FullImage = styled.div`
    & img {
        width: 100% !important; height: auto !important;
    }
`;
const FullVideo = styled.div`
    & video {
        width: 100%;
        margin: auto;
        display: block; 
        text-align: center;
    }

    & .iframeContainer {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%;
    }
    & .iframeContainer iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

const ImageCaption = styled.p`
    width: 100%;
    margin: auto;
    display: block;
    color: var(--black);
    text-align: left;
    font-style: italic;
`;
const VideoCaption = styled.p`
    width: 100%;
    margin: auto;
    display: block;
    color: var(--black);
    text-align: left;
    font-style: italic;
`;

export default function FullWidthMedia(props) {
    const { 
        types,
        fullImage,
        iframeembed,
        imageCaption,
        videoCaption,
        mpfour,
    } = props;

     const mediaStructure = (types) => {
        switch (types) {
            case 'Image':
                return (
                    <FullImage>
                        <Image
                            src={fullImage.mediaItemUrl}
                            alt={fullImage.altText}
                            width={1200}
                            height={800}
                            layout="responsive"
                         />
                         {imageCaption && (
                            <ImageCaption className="sans-serif">{imageCaption}</ImageCaption>
                         )}
                    </FullImage>
                )
             case 'Video':
                return (
                    <FullVideo>
                        {mpfour && (
                             <video>
                                <source src={mpfour} type="video/mp4" />
                             </video>
                        )}
                        {iframeembed && (
                            <div className="iframeContainer">
                                <div dangerouslySetInnerHTML={{ __html: iframeembed}}></div>
                            </div>
                        )}
                        {videoCaption && (
                            <VideoCaption className="sans-serif">{videoCaption}</VideoCaption>
                        )}
                    </FullVideo>
                )
            case 'Slider':
                return (
                        <div>

                        </div>
                )
            default:
                return null;
        }
    }

    return (
        <FullWidthContainer>
            { mediaStructure(types) }
        </FullWidthContainer>
    )
}