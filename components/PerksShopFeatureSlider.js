"use client";
import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";

import "flickity/css/flickity.css";
import Flickity from "react-flickity-component";
export const PerksShopFeatureSliderQueryFragment = ``;

const Button = styled.a`
	transition: background-color 0.3s ease;
	&:hover {
		background-color: var(--dark-brown) !important;
	}
`;
const Title = styled.div``;
const Subtitle = styled.div``;
const Content = styled.div``;
const ContentContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 900px) {
		max-width: 80%;
		margin: 0 auto;
	}
`;
const RightMedia = styled(Image)`
	margin-top: ${(props) => (props.$noTopMargin ? "0" : "15rem")};
	object-fit: cover;
`;
const RightMediaContainer = styled.div`
	margin-top: ${(props) => (props.$noTopMargin ? "0" : "10rem")};

	@media screen and (max-width: 810px) {
		margin-top: 3rem;
	}
`;
const BottomMedia = styled(Image)`
	margin-top: 5rem;
	object-fit: cover;
`;
const TopMedia = styled(Image)`
	object-fit: cover;
`;
const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
const SingleSection = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	/* align-items: center; */
	justify-content: center;
	width: 90vw;
	margin-right: 5vw;
	max-width: 1440px;

	@media screen and (max-width: 900px) {
		flex-direction: column-reverse;
		gap: 0;
		width: 100vw;
		margin-right: 0;
	}
`;
const MediaContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	margin-block: 7rem;
	flex: 1.75;
	@media screen and (max-width: 810px) {
		margin-block: unset;
		margin: 2rem 0 4rem 0;
	}
`;
const PerksShopFeatureSliderSection = styled.section`
	@media screen and (max-width: 810px) {
		${MediaContainer} {
			opacity: 0;
		}

		${SingleSection}:nth-of-type(2) ${Left} {
			margin-top: 4rem;
		}
		${SingleSection}:nth-of-type(2) ${RightMediaContainer} {
			margin-top: 0;
		}
		.slider-container .flickity-viewport {
			min-height: 95vh;
		}

		.is-selected ${MediaContainer} {
			position: relative;
			width: 100vw;
			left: 0vw;
			opacity: 1;
		}
	}
`;

export default function PerksShopFeatureSlider(props) {
	const slider = useRef(null);
	return (
		<PerksShopFeatureSliderSection>
			{props.anchor && <a id={props.anchor}></a>}
			<Flickity
				options={{
					draggable: true,
					cellAlign: "left",
					prevNextButtons: false,
					pageDots: false,
					wrapAround: true,
					imagesLoaded: true,
					selectedAttraction: 0.007,
					friction: 0.17,
					pauseAutoPlayOnHover: true,
				}}
				className="slider-container"
				disableImagesLoaded={false} // default false
				reloadOnUpdate={false} // default false
				static // default false
				flickityRef={(c) => {
					slider.current = c;
				}}>
				{props?.features?.map((slide, index) => (
					<SingleSection key={`feature-section-${index}`}>
						<MediaContainer>
							<Left>
								{!slide.leftBottomPhoto &&
									slide.leftTopPhoto && (
										<TopMedia
											src={
												slide.leftTopPhoto.mediaItemUrl
											}
											alt={slide.leftTopPhoto.altText}
											width={393}
											height={413}
										/>
									)}
								{!slide.leftTopPhoto &&
									slide.leftBottomPhoto && (
										<BottomMedia
											src={
												slide.leftBottomPhoto
													.mediaItemUrl
											}
											width={428}
											height={509}
											alt={slide.leftBottomPhoto.altText}
										/>
									)}
							</Left>
							<RightMediaContainer>
								<RightMedia
									src={slide.rightPhoto.mediaItemUrl}
									alt={slide.rightPhoto.altText}
									width={416}
									height={515}
									style={{ objectFit: "cover !important" }}
								/>
							</RightMediaContainer>
						</MediaContainer>
						<ContentContainer>
							<Subtitle className="sans-serif-bold sub-heading">
								{slide.subtitle}
							</Subtitle>
							<Title className="heading">{slide.title}</Title>
							<Content
								className="black body-copy sans-serif"
								style={{
									marginTop: "1rem",
									marginBottom: "3rem",
								}}
								dangerouslySetInnerHTML={{
									__html: slide.content,
								}}
							/>
							<Button
								href={slide.ctaLink}
								style={{
									padding: "1.25rem 2.5rem",
									backgroundColor: "#8C351F",
									maxWidth: "fit-content",
									color: "white",
								}}>
								{slide.ctaText}
							</Button>
						</ContentContainer>
					</SingleSection>
				))}
			</Flickity>
		</PerksShopFeatureSliderSection>
	);
}
