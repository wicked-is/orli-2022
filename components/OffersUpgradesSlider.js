"use client";
import dynamic from "next/dynamic";
import "flickity/css/flickity.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";

const Flickity = dynamic(() => import("react-flickity-component"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const OffersSliderContainer = styled.section`
    width: 100%;
    display: block;
    margin: auto;
    position: relative;
    background-image: url(${props => props['data-background'] || 'none'});
    background-size: cover !important;
    -webkit-background-size: cover !important;
    -moz-background-size: cover !important;
    -o-background-size: cover !important;
    background-position: center center;
    background-repeat: no-repeat;

    &.paddingtop {
        padding-top: 6rem;
    }
    &.paddingbottom {
        padding-bottom: 6rem;
    }
    &.paddingtopbottom {
        padding-top: 6rem;
        padding-bottom: 6rem;
    }
    & h2.heading {
        padding-left: 6rem;
    }
`;

const OffersUpgradesContainer = styled.div`
    width: calc(100% - 6rem);
    display: block;
    margin: auto auto auto 6rem;
    position: relative;

    .offersSlide {
        width: 33.33%;
        margin-right: 4rem;
    }
`;

const ImageBlock = styled.div`
    width: 100%;
	height: 300px;
	z-index: 2;
	position: relative;
	overflow: hidden;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;
	background-repeat: no-repeat !important;
`;

const OffersTitle = styled.div`
    display: inline;
	width: 100%;
	text-align: left;
	margin: 1rem auto
	position: relative;
	transition: 0.3s ease all;
`;

export default function OffersUpgradesSlider(props) {
    const { offersUpgrades, heading, paddingOptions, backgroundOptions, backgroundImage } = props;
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0);

    return (
        <OffersSliderContainer data-background={backgroundImage?.mediaItemUrl} className={paddingOptions}>
            {heading && (
				<h2 className="serif heading left">{heading}</h2>
			)}
            <OffersUpgradesContainer>
                <Flickity
                options={{
                    cellAlign: "left",
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    percentPosition: true,
                    setGallerySize: true,
                    initialIndex: 1,
                }}
                flickityRef={c => {
                    slider.current = c
                }}
                className="featured-story-slider"
            >
            {offersUpgrades?.map((offer, index) => (
               <div className="offersSlide" key={`${index}${offer?.slug}`}>
                    <ImageBlock
						style={{
						    backgroundImage: `url(${offer.featuredImage.node.mediaItemUrl})`,
						}}>
					</ImageBlock>
                    <OffersTitle>
						<p className="serif press-heading black left">
							{offer.title}
						</p>
					</OffersTitle>
               </div>
            ))}
            </Flickity>
            </OffersUpgradesContainer>
        </OffersSliderContainer>
    );
}