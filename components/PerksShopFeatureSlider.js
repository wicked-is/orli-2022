"use client";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
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
		flex: unset;
		max-width: 80%;
		margin: 0 auto;
	}
`;
const RightMedia = styled(Image)`
	margin-top: ${(props) => (props.$noTopMargin ? "0" : "15rem")};
	object-fit: cover;

	@media screen and (max-width: 810px) {
		margin-top: 0;
		width: min(100%, 420px) !important;
		height: auto !important;
	}
`;
const RightMediaContainer = styled.div`
	margin-top: ${(props) => (props.$noTopMargin ? "0" : "10rem")};

	@media screen and (max-width: 810px) {
		margin-top: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}
`;
const BottomMedia = styled(Image)`
	margin-top: 5rem;
	object-fit: cover;

	@media screen and (max-width: 810px) {
		margin-top: 0;
		width: min(100%, 420px) !important;
		height: auto !important;
	}
`;
const TopMedia = styled(Image)`
	object-fit: cover;

	@media screen and (max-width: 810px) {
		width: min(100%, 420px) !important;
		height: auto !important;
	}
`;
const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media screen and (max-width: 810px) {
		display: none;
	}
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
		width: 92vw;
		margin-right: 1rem;
	}
`;
const MediaContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	margin-block: 7rem;
	flex: 1.75;
	@media screen and (max-width: 810px) {
		flex: unset;
		flex-direction: row;
		align-items: center;
		margin-block: unset;
		margin: 1rem 0 1.5rem 0;
		gap: 0;
	}
`;
const PerksShopFeatureSliderSection = styled.section`
	@media only screen and (max-width: 810px) {
		padding: 0 0 2rem 0;
	}
	.slider-container {
		cursor: grab;
	}

	.slider-container:active {
		cursor: grabbing;
	}

	.slider-container .swiper-slide {
		width: auto;
	}

	.slider-container .swiper-pagination {
		position: relative;
		bottom: auto;
		margin-top: 0.75rem;
		display: none;
	}

	.slider-container .swiper-pagination-bullet {
		width: 8px;
		height: 8px;
		opacity: 0.35;
		background: var(--black);
	}

	.slider-container .swiper-pagination-bullet-active {
		opacity: 1;
		background: var(--brown);
	}

	@media screen and (max-width: 810px) {
		.slider-container .swiper-pagination {
			display: block;
			margin-top: 0.25rem;
		}

		${MediaContainer} {
			width: 100%;
			left: auto;
			opacity: 1;
		}
	}
`;

export default function PerksShopFeatureSlider(props) {
	return (
		<PerksShopFeatureSliderSection>
			{props.anchor && <a id={props.anchor}></a>}
			<Swiper
				modules={[Pagination, A11y]}
				loop={true}
				slidesPerView="auto"
				spaceBetween={0}
				pagination={{ clickable: true }}
				className="slider-container"
				watchSlidesProgress={true}
				a11y={{ enabled: true }}>
				{props?.features?.map((slide, index) => (
					<SwiperSlide key={`feature-section-${index}`}>
						<SingleSection>
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
					</SwiperSlide>
				))}
			</Swiper>
		</PerksShopFeatureSliderSection>
	);
}
