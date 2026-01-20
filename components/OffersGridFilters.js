import Image from "next/image";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";
gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const OffersGridContainer = styled.section`
	width: 100%;
	display: block;
	margin: auto;
	position: relative;
	padding: 6rem 5.5rem 6rem 5.5rem;
	& h1 {
		margin: 2rem auto 2rem auto;
	}
	@media only screen and (max-width: 820px) {
		& {
			padding: 6rem 3.5rem 6rem 3.5rem;
		}
		& h1 {
			margin: 0rem auto 2rem auto;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			padding: 6rem 2rem 6rem 2rem;
		}
	}
`;
const OffersGridFlex = styled.div`
	display: flex;
	gap: 4rem;
	align-items: flex-start;
	justify-content: space-between;
	@media only screen and (max-width: 900px) {
		& {
			flex-direction: column;
			gap: 4rem;
		}
	}

	.container {
		flex: 3.2;
		width: 100%;
		display: flex;
		margin: 0;
		flex-wrap: wrap;
		position: relative;
	}

	.sidebar {
		flex: 0.8;
		display: flex;
		flex-direction: column;
		gap: 3rem;

		.howtoBook p:nth-of-type(2) {
			font-family: "GT Walsheim Light";
		}
		& button {
			text-transform: uppercase;
			background: rgba(229, 228, 226, 0.3);
			padding: 1rem 1rem;
			border: 0px solid var(--black);
			width: 100%;
			cursor: pointer;
			transition: 0.3s ease all;
		}

		@media only screen and (max-width: 900px) {
			& {
				width: 100%;
				flex-direction: column-reverse;
			}
		}
		.filterContainer {
			display: flex;
			flex-direction: column;
			.filterToggle {
				display: flex;
				align-items: center;
				justify-content: space-between;

				cursor: pointer;
				p {
					text-transform: uppercase;
					font-size: var(--body);
					font-weight: 600;
				}
				img {
					width: 15px !important;
					height: auto !important;
					transform: rotate(0deg);
				}
			}

			&.open .filterToggle img {
				transform: rotate(180deg);
			}

			&.open ul {
				display: block;
			}
			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				display: none;
			}
		}
	}
`;

const FilterListItem = styled.li`
	display: flex;
	gap: 1rem;
	align-items: center;
	position: relative;
	padding: 0 0 1rem 0;
	cursor: pointer;
	transition: 0.3s ease all;

	&:before {
		content: "";
		border: 1px solid #e5e4e2;
		width: 15px;
		height: 15px;
		display: block;
		transition: 0.3s ease all;
	}

	&:hover:before {
		border: 1px solid var(--brown);
		background: var(--brown);
	}

	&.active:before {
		border: 1px solid var(--brown);
		background: var(--brown);
	}
`;

const ImageBlock = styled.div`
	width: 100%;
	z-index: 2;
	position: relative;
	overflow: hidden;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;
	background-repeat: no-repeat !important;

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

const OffersTile = styled.div`
	display: inline;
	width: calc(33.33% - 2rem);
	float: left;
	margin: 0.5rem 1rem 3rem 1rem;
	position: relative;
	transition: 0.3s ease all;

	& img.blogImage {
		cursor: pointer;
	}

	& img.blogImage:hover p.heading {
		color: var(--brown) !important;
	}

	& p.heading:hover {
		color: var(--brown);
	}

	@media only screen and (max-width: 820px) {
		& {
			width: calc(50% - 2rem);
			margin: 0.5rem 1rem 3rem 1rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			width: 100%;
			margin: 0rem 0rem 2rem 0rem;
		}
	}
`;

const OffersTitle = styled.div`
	position: relative;
	margin: auto;
	text-align: left;
	width: 100%;
	display: block;
	z-index: 9;
	cursor: pointer;
	transition: 0.3s ease all;
`;

const OffersDialog = styled.div`
	width: 100%;
	height: 100%;
	border: 0;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999999999;
	display: none;

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

const NavHolder = styled.button`
	display: flex;
	align-items: center;
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
	font-family: inherit;

	&:focus {
		outline: 2px solid var(--brown);
		outline-offset: 2px;
	}

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: flex-start;
		span {
			margin: 0 !important;
		}
		padding: 0 1rem;

		font-size: 0.85rem;

		&:first-of-type {
			flex-direction: column-reverse;
		}

		&:last-of-type {
			align-items: flex-end;
		}
	}
`;

const SwiperContainer = styled.div`
	width: 100%;
	height: 100%;

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		width: 100vw;
	}
`;

export default function OffersGridFilters(props) {
	const { offers, upgrades, filters, heading, howToBook } = props;

	const [selected, setSelected] = useState([]);

	// Toggle a filter on click
	const toggleFilter = useCallback((slug) => {
		setSelected((prev) =>
			prev.includes(slug)
				? prev.filter((s) => s !== slug)
				: [...prev, slug]
		);
	}, []);

	// Optional: quick clear
	const clearFilters = useCallback(() => setSelected([]), []);

	// Helper: extract tag slugs from an offer
	// Adjust to match your GraphQL shape, e.g. nodes?.map(n => n.slug)
	const getOfferTags = useCallback(
		(offer) =>
			(offer?.Upgrades?.filters || offer?.singleOffers?.filters) ?? [],
		[]
	);

	// --- 2) Compute filtered offers ---
	// Decide your matching logic:
	//   OR = show if offer has ANY selected tag
	//   AND = show if offer contains ALL selected tags
	const matchMode = "OR";

	const filteredOffers = useMemo(() => {
		if (!offers) return [];
		if (selected.length === 0) return offers;

		return offers.filter((offer) => {
			const tags = getOfferTags(offer);
			if (!tags || tags.length === 0) return false;

			if (matchMode === "AND") {
				return selected.every((s) => tags.includes(s));
			} else {
				// OR
				return selected.some((s) => tags.includes(s));
			}
		});
	}, [offers, selected, getOfferTags, matchMode]);

	useEffect(() => {
		const sections = gsap.utils.toArray(".fadeinpress, .fadeinoffers");
		sections.forEach((section) => {
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

	function handleFormFocus(e) {
		e.preventDefault();
		if (props.closeDialog) closeDialog();
		window.openBookingFlow();
	}

	const [swiperInstance, setSwiperInstance] = useState(null);
	const [sliderActive, setSliderActive] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const closeButtonRef = useRef(null);

	function openModalAt(index) {
		setSliderActive(index);
		setIsOpen(true);
		// Focus the close button when modal opens for accessibility
		setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 100);
	}

	function closeModal() {
		setIsOpen(false);
		setSwiperInstance(null);
	}

	function changeSlider(e) {
		e.preventDefault();
		const i = Number(e.currentTarget.dataset.slide);
		openModalAt(i);
	}

	function sliderPrevious() {
		if (swiperInstance) swiperInstance.slidePrev();
	}

	function sliderNext() {
		if (swiperInstance) swiperInstance.slideNext();
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
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<OffersGridContainer>
			{heading && <h1 className="serif heading black left">{heading}</h1>}
			<OffersGridFlex>
				<div className="sidebar">
					<div className="filterContainer open">
						<div className="filterToggle">
							<p className="sub-heading-bold">Filter By</p>
							<Image
								src="https://orlidev.wpengine.com/wp-content/uploads/2025/09/carbon_caret-up.svg"
								alt="caret"
								width="20"
								height="20"
							/>
						</div>
						<ul>
							{filters &&
								filters.map((filter, index) => {
									const slug = filter.class; // your code already puts the slug here
									const active = selected.includes(slug);
									return (
										<FilterListItem
											key={`${index}${slug}`}
											className={`sans-serif body black ${slug} ${
												active ? "active" : ""
											}`}
											onClick={() => toggleFilter(slug)}
											role="button"
											aria-pressed={active}
											tabIndex={0}
											onKeyDown={(e) => {
												if (
													e.key === "Enter" ||
													e.key === " "
												) {
													e.preventDefault();
													toggleFilter(slug);
												}
											}}>
											{filter.label}
										</FilterListItem>
									);
								})}
						</ul>
					</div>

					{selected.length > 0 && (
						<button
							type="button"
							onClick={clearFilters}
							style={{
								alignSelf: "flex-start",
								margin: "0.5rem 0 1rem 0",
							}}
							className="sans-serif body">
							Clear filters ({selected.length})
						</button>
					)}

					{howToBook && (
						<div className="howtoBook">
							<p className="sub-heading-bold black">
								HOW TO BOOK
							</p>
							{parse(`${howToBook}`)}
						</div>
					)}
				</div>
				<div className="container">
					{filteredOffers &&
						filteredOffers.map((offer, i) => (
							<OffersTile
								key={`${i}${offer.slug}`}
								className="fadeinoffers"
								data-tags={
									getOfferTags(offer)?.join(" ") || ""
								}>
								<ImageBlock>
									<Image
										src={
											offer.featuredImage.node
												.mediaItemUrl
										}
										alt={offer.featuredImage.node.altText}
										width={600}
										height={400}
										layout="responsive"
										objectFit="cover"
									/>
									<div className="hoverContainer">
										<div
											className="modal"
											onClick={changeSlider}
											data-slide={i}>
											View Details
										</div>
									</div>
								</ImageBlock>
								<OffersTitle>
									<p
										className="serif press-heading black"
										onClick={changeSlider}
										data-slide={i}>
										{offer.title}
									</p>
								</OffersTitle>
							</OffersTile>
						))}
					{filteredOffers?.length === 0 && (
						<p className="sans-serif body">
							No offers match those filters.
						</p>
					)}
				</div>
			</OffersGridFlex>

			{isOpen && (
				<OffersDialog
					style={{ display: "block" }}
					role="dialog"
					aria-modal="true"
					aria-labelledby="offers-modal-title"
					onClick={(e) => {
						if (e.target === e.currentTarget) closeModal();
					}}>
					<div>
						<button
							ref={closeButtonRef}
							type="button"
							onClick={closeModal}
							aria-label="Close modal"
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
								enabled: true,
								prevSlideMessage: "Previous offer",
								nextSlideMessage: "Next offer",
								firstSlideMessage: "This is the first offer",
								lastSlideMessage: "This is the last offer",
							}}
							onSwiper={(swiper) => setSwiperInstance(swiper)}
							onSlideChange={(swiper) =>
								setSliderActive(swiper.realIndex)
							}>
							{filteredOffers?.map((offer, i) => (
								<SwiperSlide key={i}>
									<ContentContainer>
										<div
											role="img"
											aria-label={
												offer?.featuredImage?.node
													?.altText ||
												`Image for ${offer?.title}`
											}
											style={{
												backgroundImage: `url(${offer?.featuredImage?.node?.mediaItemUrl})`,
											}}></div>
										<LeftHalf className="relative">
											<ModalContentContainer>
												<h2
													id="offers-modal-title"
													className="heading">
													{offer?.title}
												</h2>
												<DescriptionContainer className="sans-serif body-copy black variable-height">
													{parse(
														`${
															offer?.Upgrades
																?.description ||
															offer?.singleOffers
																?.offerDescription
														}`
													)}
												</DescriptionContainer>
											</ModalContentContainer>
											<SliderNavigationContainer>
												<NavHolder
													type="button"
													onClick={sliderPrevious}
													aria-label={`Previous offer: ${
														filteredOffers[
															sliderActive - 1
														]
															? filteredOffers[
																	sliderActive -
																		1
															  ]?.title
															: filteredOffers[
																	filteredOffers.length -
																		1
															  ]?.title
													}`}>
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
														{filteredOffers[
															sliderActive - 1
														]
															? filteredOffers[
																	sliderActive -
																		1
															  ]?.title
															: filteredOffers[
																	filteredOffers.length -
																		1
															  ]?.title}
													</span>
												</NavHolder>
												<NavHolder
													type="button"
													onClick={sliderNext}
													aria-label={`Next offer: ${
														filteredOffers[
															sliderActive + 1
														]
															? filteredOffers[
																	sliderActive +
																		1
															  ]?.title
															: filteredOffers[0]
																	?.title
													}`}>
													<span
														className="sans-serif body-copy black"
														style={{
															marginRight:
																".75rem",
														}}>
														{filteredOffers[
															sliderActive + 1
														]
															? filteredOffers[
																	sliderActive +
																		1
															  ]?.title
															: filteredOffers[0]
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
		</OffersGridContainer>
	);
}
