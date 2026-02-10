import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export const ExperiencesGridQuery = `
  ... on Page_Flexiblecontent_Sections_ExperiencesGrid {
          anchor
          fieldGroupName
          experiences {
            experiencesContent
            experiencesTitle
            experiencesImage {
              altText
              mediaItemUrl
            }
            experiencesGallery {
              altText
              mediaItemUrl
            }
          }
        }`;

const GridContainer = styled.section`
	padding: 80px 60px;
	/* background-color: #f5f3f0; */

	@media (max-width: 968px) {
		padding: 60px 30px;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
	max-width: 1400px;
	margin: 0 auto;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 30px;
	}

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
		gap: 30px;
	}
`;

const Card = styled.article`
	cursor: pointer;
	transition: transform 0.3s ease;

	&:hover {
		transform: translateY(-5px);
	}

	&:focus {
		outline: 2px solid #6b4423;
		outline-offset: 4px;
	}
`;

const CardImage = styled.img`
	width: 100%;
	/* height: 280px; */
	object-fit: cover;
	display: block;

	/* @media (max-width: 768px) {
		height: 220px;
	} */
`;

const CardTitle = styled.h3`
	margin-block: 1rem 1.25rem;
	color: #1a1a1a;

	@media (max-width: 768px) {
		font-size: 24px;
	}
`;

const CardButton = styled.button`
	background-color: #8c361e;
	color: white;
	padding: 20px 40px;
	border: none;
	cursor: pointer;
	font-size: 12px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #8c361e;
	}

	&:focus {
		outline: 2px solid #8c361e;
		outline-offset: 2px;
	}
`;

const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2000;
	padding: 20px;
`;

const ModalContent = styled.div`
	background-color: white;
	max-width: 1200px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
	display: flex;

	@media (max-width: 968px) {
		flex-direction: column;
		max-height: 95vh;
	}
`;

const ModalImageSection = styled.div`
	flex: 1;
	max-width: 654px;
	max-height: 654px;
	position: relative;
	min-height: 400px;
	background-color: #f0f0f0;

	@media (max-width: 968px) {
		min-height: 300px;
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
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.swiper-button-prev,
	.swiper-button-next {
		background-color: #0c2b1c;
		width: 31px;
		height: 64px;
		background-image: url("/assets/icons/experiences-grid-modal-arrow.svg");
		background-repeat: no-repeat;
		background-position: center;
		color: transparent;

		&::after {
			display: none !important;
			content: none !important;
		}

		&:hover {
			background-color: rgba(0, 0, 0, 0.7);
		}
	}

	.swiper-button-prev {
		transform: rotate(180deg);
	}

	.swiper-pagination-bullet {
		background-color: white;
		opacity: 0.5;
		width: 10px;
		height: 10px;
	}

	.swiper-pagination-bullet-active {
		opacity: 1;
		background-color: white;
	}
`;

const ModalTextSection = styled.div`
	flex: 1;
	padding: 60px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 968px) {
		padding: 40px 30px;
	}
`;

const CloseButton = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background: none;
	border: none;
	font-size: 32px;
	color: #333;
	cursor: pointer;
	z-index: 10;
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.7;
	}

	&:focus {
		outline: 2px solid #6b4423;
		outline-offset: 2px;
	}
`;

const ModalTitle = styled.h2`
	/* font-family: "Playfair Display", serif; */
	/* font-size: 42px; */
	/* font-weight: 400; */
	margin-bottom: 24px;
	color: #1a1a1a;

	@media (max-width: 768px) {
		font-size: 32px;
	}
`;

const ModalDescription = styled.div`
	font-size: 16px;
	line-height: 1.8;
	color: #4a4a4a;
	margin-bottom: 32px;

	p {
		margin-bottom: 16px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const ModalButton = styled.a`
	display: inline-block;
	background-color: #6b4423;
	color: white;
	padding: 14px 32px;
	text-decoration: none;
	font-size: 13px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s ease;
	align-self: flex-start;

	&:hover {
		background-color: #533318;
	}

	&:focus {
		outline: 2px solid #6b4423;
		outline-offset: 2px;
	}
`;

const ExperiencesGrid = (props) => {
	const { experiences } = props;
	// console.log("ExperiencesGrid props:", props);
	const [selectedExperience, setSelectedExperience] = useState(null);

	const openModal = (experience) => {
		setSelectedExperience(experience);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedExperience(null);
		document.body.style.overflow = "unset";
	};

	const handleCardClick = (experience) => {
		openModal(experience);
	};

	const handleCardKeyDown = (e, experience) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openModal(experience);
		}
	};

	const handleModalBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleCloseKeyDown = (e) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	return (
		<>
			<GridContainer>
				<Grid>
					{experiences.map((experience, index) => (
						<Card
							key={index}
							onClick={() => handleCardClick(experience)}
							onKeyDown={(e) => handleCardKeyDown(e, experience)}
							tabIndex={0}
							role="button"
							aria-label={`View details about ${experience.experiencesTitle}`}>
							<CardImage
								src={experience.experiencesImage?.mediaItemUrl}
								alt={
									experience.experiencesImage?.altText ||
									experience.experiencesTitle
								}
							/>
							<CardTitle className="serif heading">
								{experience.experiencesTitle}
							</CardTitle>
							<CardButton
								className="sans-serif uppercase body-copy"
								aria-label={`Learn more about ${experience.experiencesTitle}`}>
								LEARN MORE
							</CardButton>
						</Card>
					))}
				</Grid>
			</GridContainer>

			{selectedExperience && (
				<Modal
					onClick={handleModalBackdropClick}
					onKeyDown={handleCloseKeyDown}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title">
					<ModalContent>
						<CloseButton
							onClick={closeModal}
							aria-label="Close modal"
							tabIndex={0}>
							×
						</CloseButton>

						<ModalImageSection>
							<SwiperContainer>
								<Swiper
									modules={[Navigation, A11y]}
									spaceBetween={0}
									slidesPerView={1}
									navigation={true}
									speed={300}
									loop={false}
									autoplay={false}
									allowTouchMove={true}
									keyboard={false}
									mousewheel={false}
									freeMode={false}
									watchSlidesProgress={false}
									a11y={{
										prevSlideMessage: "Previous image",
										nextSlideMessage: "Next image",
										paginationBulletMessage:
											"Go to slide {{index}}",
									}}>
									{selectedExperience?.experiencesGallery ? (
										selectedExperience?.experiencesGallery?.map(
											(image, index) => {
												if (index > 1) return;
												return (
													<SwiperSlide key={index}>
														<Image
															src={
																image.mediaItemUrl
															}
															alt={
																image.altText ||
																`${
																	selectedExperience.title
																} ${index + 1}`
															}
															width={654}
															height={654}
														/>
													</SwiperSlide>
												);
											},
										)
									) : (
										<SwiperSlide key={0}>
											<Image
												src={
													selectedExperience
														.experiencesImage
														?.mediaItemUrl
												}
												alt={
													selectedExperience
														.experiencesImage
														?.altText ||
													selectedExperience.title
												}
												width={654}
												height={654}
											/>
										</SwiperSlide>
									)}
								</Swiper>
							</SwiperContainer>
						</ModalImageSection>

						<ModalTextSection>
							<ModalTitle
								id="modal-title"
								className="serif heading">
								{selectedExperience.experiencesTitle}
							</ModalTitle>
							<ModalDescription
								className="sans-serif body-copy"
								dangerouslySetInnerHTML={{
									__html: selectedExperience.experiencesContent,
								}}
							/>
							{selectedExperience.buttonLink && (
								<ModalButton
									href={selectedExperience.buttonLink}
									aria-label={`Visit ${selectedExperience.title} page`}>
									{selectedExperience.buttonText ||
										"LEARN MORE"}
								</ModalButton>
							)}
						</ModalTextSection>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default ExperiencesGrid;
