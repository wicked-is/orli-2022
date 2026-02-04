import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import parse from "html-react-parser";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

const SliderContainer = styled.section`
	background-image: url(https://orlidev.wpengine.com/wp-content/uploads/2026/02/Rectangle-65.png);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	padding: 40px 0;
	position: relative;
	min-height: 773px;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding: 24px 0;
		min-height: auto;
	}
`;

const SliderWrapper = styled.div`
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 80px;
	position: relative;

	@media (max-width: 1024px) {
		padding: 0 60px;
	}

	@media (max-width: 768px) {
		padding: 0 16px;
	}
`;

const StyledSwiper = styled(Swiper)`
	width: 100%;

	.swiper-slide {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.swiper-slide-active {
		opacity: 1;
	}

	.swiper-pagination {
		position: relative;
		margin-top: 24px;
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
		background: rgba(255, 255, 255, 0.4);
		opacity: 1;
		border-radius: 50%;
		transition: background-color 0.3s ease;
		cursor: pointer;

		&:focus {
			outline: 2px solid #ffffff;
			outline-offset: 2px;
		}
	}

	.swiper-pagination-bullet-active {
		background: #ffffff;
	}
`;

const SlideContent = styled.article`
	display: grid;
	grid-template-columns: 1.25fr 0.75fr;
	gap: 48px;
	align-items: center;
	background: transparent;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 24px;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 4 / 3;
	overflow: hidden;

	@media (max-width: 900px) {
		aspect-ratio: 16 / 10;
	}
`;

const EventImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	color: #ffffff;
	padding-right: 40px;

	@media (max-width: 900px) {
		padding-right: 0;
		padding: 0 16px 16px;
	}
`;

const FeaturedLabel = styled.span`
	font-family: "GT Walsheim Bold";
	font-size: 12px;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: #ffffff;
`;

const HostedBy = styled.span`
	display: inline-block;
	padding: 6px 16px;
	border: 1px solid rgba(255, 255, 255, 0.6);
	border-radius: 20px;
	font-size: 14px;
	color: #ffffff;
	width: fit-content;
`;

const EventTitle = styled.h2`
	/* font-family: "Georgia", serif; */
	font-size: 36px;
	font-weight: 400;
	line-height: 1.2;
	color: #ffffff;
	margin: 8px 0;

	@media (max-width: 768px) {
		font-size: 28px;
	}
`;

const EventMeta = styled.div`
	font-family: "GT Walsheim Light";
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 1rem;
	color: #ffffff;
`;

const CalendarIcon = styled.span`
	display: inline-flex;
	align-items: center;

	svg {
		width: 16px;
		height: 16px;
	}
`;

const EventDescription = styled.p`
	font-size: 16px;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.9);
	margin: 8px 0 16px;
`;

const CTAButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 20px 40px;
	font-size: 1rem;
	background-color: #8c361e;
	color: #ffffff;
	text-transform: uppercase;
	border: none;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		transform 0.2s ease;
	width: fit-content;

	&:hover {
		background-color: #a04023;
		transform: translateY(-2px);
	}

	&:focus {
		outline: 2px solid #ffffff;
		outline-offset: 4px;
	}

	&:active {
		transform: translateY(0);
	}
`;

const NavigationButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 10;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition:
		opacity 0.3s ease,
		transform 0.2s ease;

	&:hover {
		opacity: 0.8;
		transform: translateY(-50%) scale(1.1);
	}

	&:focus {
		outline: 2px solid #ffffff;
		outline-offset: 4px;
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
		transform: translateY(-50%);
	}

	svg {
		width: 60px;
		height: 36px;

		@media (max-width: 768px) {
			width: 40px;
			height: 24px;
		}
	}

	@media (max-width: 768px) {
		padding: 8px;
	}
`;

const PrevButton = styled(NavigationButton)`
	left: -3vw;

	@media (max-width: 1466px) {
		left: 0;
	}
	@media (max-width: 768px) {
		left: 3vw;
		top: 98%;
	}
`;

const NextButton = styled(NavigationButton)`
	right: -3vw;

	@media (max-width: 1466px) {
		right: 0;
	}
	@media (max-width: 768px) {
		right: 3vw;
		top: 98%;
	}
`;

const VisuallyHidden = styled.span`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

// Arrow SVG Components
const ArrowLeft = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="60"
		height="36"
		viewBox="0 0 60 36"
		fill="none"
		aria-hidden="true">
		<g clipPath="url(#clip0_512_299)">
			<path
				d="M60 18.0062L1.3863 18.0062"
				stroke="white"
				strokeMiterlimit="10"
			/>
			<path
				d="M23.5176 0.483591L0.996302 17.9937L23.4325 35.5039"
				stroke="white"
				strokeMiterlimit="10"
			/>
		</g>
		<defs>
			<clipPath id="clip0_512_299">
				<rect
					width="60"
					height="36"
					fill="white"
					transform="translate(60 36) rotate(-180)"
				/>
			</clipPath>
		</defs>
	</svg>
);

const ArrowRight = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="60"
		height="36"
		viewBox="0 0 60 36"
		fill="none"
		aria-hidden="true">
		<g clipPath="url(#clip0_512_300)">
			<path d="M0 17.9938H58.6137" stroke="white" strokeMiterlimit="10" />
			<path
				d="M36.4824 35.5164L59.0037 18.0063L36.5675 0.496094"
				stroke="white"
				strokeMiterlimit="10"
			/>
		</g>
		<defs>
			<clipPath id="clip0_512_300">
				<rect width="60" height="36" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

// Calendar Icon Component
const CalendarIconSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true">
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
		<line x1="16" y1="2" x2="16" y2="6"></line>
		<line x1="8" y1="2" x2="8" y2="6"></line>
		<line x1="3" y1="10" x2="21" y2="10"></line>
	</svg>
);

// Truncate function for if text is more than 150 words
const truncateText = (text, wordLimit) => {
	const words = text.split(" ");
	if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(" ") + "...";
	}
	return text;
};

export const FeaturedEventSliderQuery = `
    ... on Page_Flexiblecontent_Sections_FeaturedEventSlider {
          anchor
          fieldGroupName
          events {
            ... on Event {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
              singleEvent {
                address
                date
                description
                time
                hostedByLabel
                rsvpLink
              }
              title(format: RENDERED)
            }
          }
        }`;

const FeaturedEventSlider = (props) => {
	const swiperRef = useRef(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const { events = [], title = "Featured Events" } = props;

	// Handle keyboard navigation for custom buttons
	const handlePrevClick = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const handleNextClick = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};

	if (!events || events.length === 0) {
		return null;
	}

	console.log(props);

	return (
		<SliderContainer
			role="region"
			aria-label={title}
			aria-roledescription="carousel">
			<SliderWrapper>
				<PrevButton
					ref={prevRef}
					onClick={handlePrevClick}
					aria-label="Previous event"
					type="button">
					<ArrowLeft />
				</PrevButton>

				<StyledSwiper
					ref={swiperRef}
					modules={[Navigation, Pagination, A11y]}
					spaceBetween={0}
					slidesPerView={1}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					pagination={{
						clickable: true,
						renderBullet: (index, className) => {
							return `<button class="${className}" aria-label="Go to slide ${index + 1}" type="button"></button>`;
						},
					}}
					a11y={{
						enabled: true,
						prevSlideMessage: "Previous event",
						nextSlideMessage: "Next event",
						firstSlideMessage: "This is the first event",
						lastSlideMessage: "This is the last event",
						paginationBulletMessage: "Go to event {{index}}",
					}}
					onBeforeInit={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}}>
					{events.map((event, index) => (
						<SwiperSlide key={index}>
							<SlideContent
								aria-roledescription="slide"
								aria-label={`${index + 1} of ${events.length}`}>
								<ImageContainer>
									<EventImage
										src={
											event.featuredImage?.node
												?.mediaItemUrl
										}
										alt={
											event.imageAlt ||
											`Event: ${event.title}`
										}
										loading={index === 0 ? "eager" : "lazy"}
									/>
								</ImageContainer>

								<ContentContainer>
									<FeaturedLabel className="sans-serif body-copy">
										Featured Event
									</FeaturedLabel>

									{event.singleEvent?.hostedByLabel && (
										<HostedBy className="sans-serif xs-copy">
											{event.singleEvent.hostedByLabel}
										</HostedBy>
									)}

									<EventTitle
										id={`event-title-${index}`}
										className="serfif heading">
										{event?.title}
									</EventTitle>

									<EventMeta>
										<CalendarIcon>
											<CalendarIconSVG />
										</CalendarIcon>
										<time
											dateTime={event.singleEvent?.date}>
											{event.singleEvent?.date}
										</time>
										{event.singleEvent?.time && (
											<>
												<span aria-hidden="true">
													|
												</span>
												<span>
													{event.singleEvent.time}
												</span>
											</>
										)}
									</EventMeta>

									{event.singleEvent?.description && (
										<EventDescription className="sans-serif body-copy">
											{parse(
												truncateText(
													event.singleEvent
														.description,
													40,
												),
											)}
										</EventDescription>
									)}

									{event.singleEvent?.rsvpLink && (
										<CTAButton
											className="body-copy sans-serif"
											href={event.singleEvent?.rsvpLink}
											aria-describedby={`event-title-${index}`}>
											{event.rsvpText || "Learn More"}
											<VisuallyHidden>
												about {event.title}
											</VisuallyHidden>
										</CTAButton>
									)}
								</ContentContainer>
							</SlideContent>
						</SwiperSlide>
					))}
				</StyledSwiper>

				<NextButton
					ref={nextRef}
					onClick={handleNextClick}
					aria-label="Next event"
					type="button">
					<ArrowRight />
				</NextButton>
			</SliderWrapper>
		</SliderContainer>
	);
};

export default FeaturedEventSlider;
