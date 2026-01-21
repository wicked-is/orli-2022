import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LoadingSpinner from "../components/LoadingSpinner";
gsap.registerPlugin(ScrollTrigger);

const FeaturedSliderContainer = styled.section`
	width: 100%;
	display: inline-block;
	margin: -0.5rem auto auto auto;
	position: relative;
	background-image: url(${(props) => props["data-background"] || "none"});
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
	&.Image .column.text h2,
	&.Image .column.text h3,
	&.Image .column.text ul,
	&.Image .column.text ol,
	&.Image .column.text h4,
	&.Image .column.text p,
	&.Image .column.text p a {
		color: var(--white) !important;
	}

	&.Image ul,
	&.Image ul li,
	&.Image ol,
	&.Image ol li {
		font-size: var(--body-copy);
		font-family: "GT Walsheim Light";
		font-weight: 400;
		line-height: 1.5;
	}

	&.Image p:nth-of-type(2),
	&.Image p:nth-of-type(3),
	&.Image p:nth-of-type(4) {
		font-size: var(--body-copy);
		font-family: "GT Walsheim Light";
		line-height: 1.5;
	}
	&.Image .swiper-pagination-bullet-active {
		background: var(--white);
		opacity: 1;
	}
	&.Image .swiper-pagination-bullet {
		background: rgba(255, 255, 255, 0.3);
		opacity: 1;
	}
	& .swiper-button-prev,
	& .swiper-button-next {
		width: 60px;
		height: 60px;
		color: var(--brown);

		&::after {
			font-size: 24px;
		}

		@media only screen and (max-width: 900px) {
			width: 40px;
			height: 40px;
			top: 20%;
			background: rgba(255, 255, 255, 0.7);
			border-radius: 50%;

			&::after {
				font-size: 18px;
			}
		}
	}
	& .swiper-button-disabled {
		opacity: 0;
	}
	&.Image .swiper-button-prev,
	&.Image .swiper-button-next {
		color: var(--white);
		@media only screen and (max-width: 900px) {
			color: var(--brown);
		}
	}
	& .flexContainer {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		align-items: center;
		justify-content: center;
		padding: 0 6rem;
		gap: 4rem;

		& .column.text .disclaimerText {
			font-size: var(--xs-copy);
			margin-top: 1rem;

			& a {
				text-decoration: underline;
			}
		}

		@media only screen and (max-width: 900px) {
			& {
				padding: 0 4rem;
				gap: 2rem;
				grid-template-columns: 1fr;
			}
		}
		@media only screen and (max-width: 600px) {
			& {
				padding: 0 2rem;
			}
		}
	}
`;

const OffersSliderContainer = styled.section`
	width: 100%;
	display: block;
	margin: auto;
	position: relative;
	background-image: url(${(props) => props["data-background"] || "none"});
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;
	background-repeat: no-repeat;

	&.Image h2,
	&.Image h3,
	&.Image ul,
	&.Image ol,
	&.Image h4,
	&.Image p,
	&.Image p a {
		color: var(--white) !important;
	}

	&.Image .offersDialog h2,
	&.Image .offersDialog h3,
	&.Image .offersDialog ul,
	&.Image .offersDialog ol,
	&.Image .offersDialog h4,
	&.Image .offersDialog p,
	&.Image .offersDialog p a {
		color: var(--black) !important;
	}

	&.Image ul,
	&.Image ul li,
	&.Image ol,
	&.Image ol li {
		font-family: "GT Walsheim Light";
		font-weight: 400;
	}

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
	& h2 {
		display: flex;
		align-items: center;
		gap: 2rem;
		position: relative;
		justify-content: space-between;
		width: 100%;

		&:after {
			content: "";
			background: #e5e4e2;
			width: calc(100% - 8rem);
			height: 1px;
		}

		&.heading {
			padding-left: 6rem;
			padding-right: 6rem;
			padding-bottom: 1rem;

			@media only screen and (max-width: 900px) {
				& {
					padding-left: 4rem;
					padding-right: 4rem;
				}
			}
			@media only screen and (max-width: 600px) {
				& {
					padding-left: 2rem;
					padding-right: 2rem;
				}
			}

			& span {
				width: fit-content;
				width: -moz-fit-content;
				width: -webkit-fit-content;
				white-space: nowrap;
			}
		}
	}
	&.Image h2:after {
		background: rgba(229, 228, 226, 0.2);
	}
`;

const OffersUpgradesContainer = styled.div`
	width: calc(100% - 6rem);
	display: block;
	margin: auto auto auto 6rem;
	position: relative;

	& .swiper {
		overflow: visible;
	}

	& .swiper-button-prev,
	& .swiper-button-next {
		width: 60px;
		height: 60px;
		color: var(--brown);

		&::after {
			font-size: 24px;
		}
	}

	& .swiper-button-prev {
		display: none;
	}

	& .swiper-button-next {
		right: 6rem;
	}

	@media only screen and (max-width: 900px) {
		width: calc(100% - 4rem);
		margin: auto auto auto 4rem;

		& .swiper-button-next {
			right: 4rem;
		}
	}

	@media only screen and (max-width: 600px) {
		width: calc(100% - 2rem);
		margin: auto auto auto 2rem;

		& .swiper-button-prev,
		& .swiper-button-next {
			width: 40px;
			height: 40px;

			&::after {
				font-size: 18px;
			}
		}

		& .swiper-button-next {
			right: 2rem;
		}
	}
`;

const ImageBlock = styled.div`
	width: 100%;
	z-index: 2;
	position: relative;
	overflow: hidden;

	& .hoverContainer {
		opacity: 0;
		transition: 0.3s ease all;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: rgba(140, 54, 30, 0.5);

		& .modal {
			color: var(--white);
			border: 1px solid var(--white);
			padding: 1rem 1rem;
			text-transform: uppercase;
			font-size: var(--xs-copy);
			font-family: "GT Walsheim Light";
			cursor: pointer;
			transition: 0.3s ease all;
		}

		& .modal:hover {
			background: var(--white);
			color: var(--black);
		}
	}

	&:hover .hoverContainer {
		opacity: 1;
	}
`;

const OffersTitle = styled.div`
	display: block;
	width: 100%;
	text-align: left;
	margin: 1rem auto;
	position: relative;
	transition: 0.3s ease all;
`;

const OffersDialog = styled.div`
	width: 100%;
	height: 100%;
	border: 0;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	z-index: 9999999999;
	display: none;

	& p,
	& ol,
	& ul li {
		font-size: var(--body-copy);
	}

	@media screen and (max-width: 500px) {
		padding: 0;
	}
`;

const ContentContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 90%;
	height: 70vh;
	margin: 15vh auto;

	> div:first-child {
		background-size: cover;
		background-position: center;
	}
	> div:last-child {
		background-color: var(--lt-grey);
		display: flex;
		flex-direction: column;
	}

	@media screen and (max-width: 1000px) {
		margin: 5vh auto;
		grid-template-columns: 1fr;

		> div:first-child {
			min-height: 20vh;
		}

		> div:last-child {
			padding: 3rem 0 0;
		}
	}

	@media screen and (max-width: 500px) {
		margin: 0 auto 0;
		/* padding: 1rem; */
		width: 100%;
		height: 100vh;

		> div:last-child {
			padding: 1rem 0 2rem;
		}

		> div:first-child {
			min-height: 30vh;
		}
	}
`;

const LeftHalf = styled.div`
	overflow-y: scroll;
	@media screen and (max-width: 768px) {
		padding-top: 3rem;
	}
`;

const ModalContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto 15%;
	.variable-height {
		flex: 1;
	}

	& h2,
	& p {
		color: var(--black) !important;
	}

	& h2 {
		width: 100%;
		display: block;
		padding-left: 0rem !important;
		padding-right: 0rem !important;
	}

	@media screen and (max-width: 500px) {
		margin: 0 5vw 0;
		padding: 1rem;

		.body-copy.variable-height {
			font-size: 0.85rem;
		}

		a {
			width: 100% !important;
		}
	}
`;

const DescriptionContainer = styled.div`
	a {
		text-decoration: underline;
	}
`;

const SliderNavigationContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 2.5rem 3rem;
	justify-content: space-between;

	@media screen and (max-width: 500px) {
		padding: 1.5rem 5vw 0;
	}
`;

const NavHolder = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: flex-start;
		span {
			margin: 0 !important;
		}
		padding: 0 1rem;

		font-size: 0.85rem;

		:first-of-type {
			flex-direction: column-reverse;
		}

		:last-of-type {
			align-items: flex-end;
		}
	}
`;

const ReservationButton = styled.button`
	width: fit-content;
	width: -moz-fit-content;
	width: -webkit-fit-content;
	padding: 1rem 2rem;
	color: #fff;
	font-size: var(--xs-copy);
	border: 0;
	background-color: var(--brown);
	transition: background-color 0.3s ease;
	&:hover {
		background-color: var(--dark-brown);
	}
`;

const SwiperContainer = styled.div`
	width: 100%;
	height: 100%;

	.swiper {
		width: 100%;
		height: 100%;
	}
`;

export default function OffersUpgradesSlider(props) {
	const {
		offersUpgrades,
		heading,
		kicker,
		paddingOptions,
		backgroundOptions,
		backgroundImage,
		sliderType,
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [modalSwiperInstance, setModalSwiperInstance] = useState(null);
	const [sliderActive, setSliderActive] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const closeButtonRef = useRef(null);

	function openModalAt(index) {
		setSliderActive(index);
		setIsOpen(true);
		setTimeout(() => {
			if (modalSwiperInstance) {
				modalSwiperInstance.slideTo(index);
			}
			if (closeButtonRef.current) {
				closeButtonRef.current.focus();
			}
		}, 100);
	}

	function closeModal() {
		setIsOpen(false);
		setModalSwiperInstance(null);
	}

	function changeSlider(e) {
		e.preventDefault();
		const i = Number(e.currentTarget.dataset.slide);
		openModalAt(i);
	}

	function sliderPrevious() {
		if (modalSwiperInstance) modalSwiperInstance.slidePrev();
	}

	function sliderNext() {
		if (modalSwiperInstance) modalSwiperInstance.slideNext();
	}

	// Handle escape key to close modal
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.key === "Escape" && isOpen) {
				closeModal();
			}
		}
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	function handleFormFocus(e) {
		e.preventDefault();
		if (props.closeDialog) props.closeDialog();
		window.openBookingFlow();
	}

	return (
		<div>
			{sliderType === "featuredslider" && (
				<FeaturedSliderContainer
					data-background={backgroundImage?.mediaItemUrl}
					className={`${paddingOptions} ${backgroundOptions}`}
					aria-label="Featured offers slider">
					<Swiper
						modules={[Navigation, Pagination, Keyboard, A11y]}
						spaceBetween={0}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						keyboard={{ enabled: true }}
						loop={true}
						a11y={{
							prevSlideMessage: "Previous offer",
							nextSlideMessage: "Next offer",
							firstSlideMessage: "This is the first offer",
							lastSlideMessage: "This is the last offer",
							paginationBulletMessage: "Go to slide {{index}}",
						}}
						onSwiper={(swiper) => setSwiperInstance(swiper)}
						className="featured-story-slider">
						{offersUpgrades?.map((offer, i) => (
							<SwiperSlide key={`offers-${i}`}>
								<div className="flexContainer">
									<div className="column image">
										<Image
											src={
												offer?.singleOffers?.offerImage
													?.mediaItemUrl ||
												offer?.Upgrades?.upgradeImage
													?.mediaItemUrl
											}
											alt={
												offer?.singleOffers?.offerImage
													?.altText ||
												offer?.Upgrades?.upgradeImage
													?.altText ||
												offer?.title ||
												"Offer Image"
											}
											width={600}
											height={400}
											style={{
												width: "100%",
												height: "auto",
												objectFit: "cover",
											}}
										/>
									</div>
									<div className="column text">
										<p className="sub-heading-bold">
											{kicker}
										</p>
										<h2 className="serif heading">
											{offer?.title}
										</h2>
										{parse(
											`${
												offer?.singleOffers
													?.offerDescription ||
												offer?.Upgrades?.description
											}`,
										)}

										<ReservationButton
											className="sans-serif uppercase distributor-open"
											onClick={handleFormFocus}
											onTouchStart={handleFormFocus}>
											{isLoading ? (
												<LoadingSpinner />
											) : (
												"Book Now"
											)}
										</ReservationButton>

										<p className="sans-serif disclaimerText">
											Terms & Conditions may apply.{" "}
											<Link
												href="/terms-conditions"
												aria-label="View Terms and Conditions">
												View Terms
											</Link>
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</FeaturedSliderContainer>
			)}
			{sliderType === "popupslider" && (
				<OffersSliderContainer
					data-background={backgroundImage?.mediaItemUrl}
					className={`${paddingOptions} ${backgroundOptions}`}
					role="region"
					aria-label="Offers and upgrades">
					{heading && (
						<h2 className="serif heading left">
							<span>{heading}</span>
						</h2>
					)}
					<OffersUpgradesContainer>
						<Swiper
							modules={[Navigation, Keyboard, A11y]}
							spaceBetween={30}
							slidesPerView={3}
							navigation
							keyboard={{ enabled: true }}
							loop={true}
							a11y={{
								prevSlideMessage: "Previous offer",
								nextSlideMessage: "Next offer",
								firstSlideMessage: "This is the first offer",
								lastSlideMessage: "This is the last offer",
							}}
							breakpoints={{
								0: {
									slidesPerView: 1.2,
									spaceBetween: 16,
								},
								600: {
									slidesPerView: 1.5,
									spaceBetween: 20,
								},
								900: {
									slidesPerView: 3,
									spaceBetween: 30,
								},
							}}
							className="featured-story-slider">
							{offersUpgrades?.map((offer, i) => (
								<SwiperSlide
									key={`${i}${
										offer?.slug ?? offer?.title ?? "offer"
									}`}>
									<ImageBlock>
										<Image
											src={
												offer.featuredImage.node
													.mediaItemUrl
											}
											alt={
												offer.featuredImage.node
													.altText ||
												offer.title ||
												"Offer image"
											}
											width={600}
											height={400}
											style={{
												width: "100%",
												height: "auto",
												objectFit: "cover",
											}}
										/>
										<div className="hoverContainer">
											<button
												className="modal"
												onClick={changeSlider}
												data-slide={i}
												aria-label={`View details for ${offer.title}`}>
												View Details
											</button>
										</div>
									</ImageBlock>
									<OffersTitle>
										<button
											className="serif press-heading black left"
											onClick={changeSlider}
											data-slide={i}
											style={{
												background: "none",
												border: "none",
												padding: 0,
												cursor: "pointer",
												textAlign: "left",
												width: "100%",
											}}
											aria-label={`View details for ${offer.title}`}>
											{offer.title}
										</button>
									</OffersTitle>
								</SwiperSlide>
							))}
						</Swiper>
					</OffersUpgradesContainer>

					{isOpen && (
						<OffersDialog
							style={{ display: "block" }}
							className="offersDialog"
							role="dialog"
							aria-modal="true"
							aria-label={`Offer details: ${offersUpgrades?.[sliderActive]?.title || "Offer"}`}>
							<div>
								<button
									ref={closeButtonRef}
									onClick={closeModal}
									aria-label="Close dialog"
									style={{
										fontSize: "2rem",
										margin: 0,
										position: "absolute",
										right: "2rem",
										top: "2rem",
										zIndex: 999999,
										color: "white",
										background: "none",
										border: "none",
										cursor: "pointer",
										padding: "0.5rem",
									}}>
									&#10005;
								</button>
							</div>
							<SwiperContainer>
								<Swiper
									modules={[Navigation, Keyboard, A11y]}
									spaceBetween={0}
									slidesPerView={1}
									initialSlide={sliderActive}
									loop={true}
									keyboard={{ enabled: true }}
									a11y={{
										prevSlideMessage: "Previous offer",
										nextSlideMessage: "Next offer",
										firstSlideMessage:
											"This is the first offer",
										lastSlideMessage:
											"This is the last offer",
									}}
									onSwiper={(swiper) =>
										setModalSwiperInstance(swiper)
									}
									onSlideChange={(swiper) =>
										setSliderActive(swiper.realIndex)
									}>
									{offersUpgrades?.map((offer, i) => (
										<SwiperSlide key={i}>
											<ContentContainer>
												<div
													role="img"
													aria-label={
														offer?.featuredImage
															?.node?.altText ||
														offer?.title ||
														"Offer image"
													}
													style={{
														backgroundImage: `url(${offer?.featuredImage?.node?.mediaItemUrl})`,
													}}></div>
												<LeftHalf className="relative">
													<ModalContentContainer>
														<h2 className="heading">
															{offer?.title}
														</h2>
														<DescriptionContainer className="sans-serif body-copy black variable-height">
															{parse(
																`${offer?.Upgrades?.description}`,
															)}
														</DescriptionContainer>
													</ModalContentContainer>
													<SliderNavigationContainer>
														<NavHolder
															as="button"
															onClick={
																sliderPrevious
															}
															aria-label={`Previous: ${
																offersUpgrades[
																	sliderActive -
																		1
																]
																	? offersUpgrades[
																			sliderActive -
																				1
																		]?.title
																	: offersUpgrades[
																			offersUpgrades.length -
																				1
																		]?.title
															}`}
															style={{
																background:
																	"none",
																border: "none",
															}}>
															<svg
																viewBox="0 0 100 100"
																height="30px"
																aria-hidden="true">
																<path
																	d="M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z"
																	className="arrow"
																	fill="var(--brown)"
																	style={{
																		transformOrigin:
																			"center",
																	}}></path>
															</svg>{" "}
															<span
																className="sans-serif body-copy black"
																style={{
																	marginLeft:
																		".75rem",
																}}>
																{offersUpgrades[
																	sliderActive -
																		1
																]
																	? offersUpgrades[
																			sliderActive -
																				1
																		]?.title
																	: offersUpgrades[
																			offersUpgrades.length -
																				1
																		]
																			?.title}
															</span>
														</NavHolder>
														<NavHolder
															as="button"
															onClick={sliderNext}
															aria-label={`Next: ${
																offersUpgrades[
																	sliderActive +
																		1
																]
																	? offersUpgrades[
																			sliderActive +
																				1
																		]?.title
																	: offersUpgrades[0]
																			?.title
															}`}
															style={{
																background:
																	"none",
																border: "none",
															}}>
															<span
																className="sans-serif body-copy black"
																style={{
																	marginRight:
																		".75rem",
																}}>
																{offersUpgrades[
																	sliderActive +
																		1
																]
																	? offersUpgrades[
																			sliderActive +
																				1
																		]?.title
																	: offersUpgrades[0]
																			?.title}
															</span>{" "}
															<svg
																viewBox="0 0 100 100"
																height="30px"
																aria-hidden="true">
																<path
																	d="M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z"
																	className="arrow"
																	transform="translate(100, 100) rotate(180)"
																	fill="var(--brown)"></path>
															</svg>
														</NavHolder>
													</SliderNavigationContainer>
												</LeftHalf>
											</ContentContainer>
										</SwiperSlide>
									))}
								</Swiper>
							</SwiperContainer>
						</OffersDialog>
					)}
				</OffersSliderContainer>
			)}
		</div>
	);
}
