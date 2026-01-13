import { useState } from "react";
import styled from "styled-components";

export const GalleryContainedQuery = `
  ... on Page_Flexiblecontent_Sections_GalleryContained {
    fieldGroupName
    title
    images {
        altText
        mediaItemUrl
    }
}`;

const GalleryContainer = styled.section`
	padding: 80px 60px;

	@media (max-width: 968px) {
		padding: 60px 30px;
	}
`;

const Title = styled.h2`
	font-family: "Playfair Display", serif;
	font-size: 48px;
	font-weight: 400;
	text-align: center;
	margin-bottom: 50px;
	color: #1a1a1a;

	@media (max-width: 968px) {
		font-size: 36px;
		margin-bottom: 40px;
	}
`;

const GalleryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 16px;
	margin-bottom: 40px;
	max-width: 1362px;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}

	// only show the first 10 images until "See More" is clicked
	& > img:nth-child(n + 11) {
		display: none;
	}
	${(props) =>
		props.seeMoreClicked &&
		`
		& > img:nth-child(n + 11) {
			display: block;
		}
	`}
`;

const GalleryImage = styled.img`
	width: 100%;
	height: 240px;
	object-fit: cover;
	display: block;
	cursor: pointer;
	transition: transform 0.3s ease;
	grid-column: span ${(props) => props.span || 1};

	&:hover {
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		height: 180px;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const SeeMoreButton = styled.button`
	background-color: #6b4423;
	color: white;
	padding: 14px 32px;
	border: none;
	cursor: pointer;
	font-size: 13px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #533318;
	}
`;

const Lightbox = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.95);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const LightboxContent = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const ImageLabel = styled.div`
	position: absolute;
	top: 30px;
	left: 50%;
	transform: translateX(-50%);
	color: #999;
	font-size: 14px;
	letter-spacing: 1px;
	z-index: 10;
`;

const LightboxImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	padding: 80px 100px;

	@media (max-width: 768px) {
		padding: 80px 20px;
	}
`;

const NavButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: white;
	font-size: 48px;
	cursor: pointer;
	padding: 20px;
	z-index: 10;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.7;
	}

	${(props) => (props.direction === "left" ? "left: 20px;" : "right: 20px;")}

	@media (max-width: 768px) {
		font-size: 32px;
		padding: 10px;
		${(props) =>
			props.direction === "left" ? "left: 10px;" : "right: 10px;"}
	}
`;

const BottomBar = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(26, 26, 26, 0.95);
	padding: 20px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px;
	letter-spacing: 1px;

	&:hover {
		opacity: 0.7;
	}

	&::before {
		content: "×";
		font-size: 24px;
	}
`;

const GallerySection = (props) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(null);
	const [seeMoreClicked, setSeeMoreClicked] = useState(false);

	const handleImageClick = (index) => {
		setCurrentImageIndex(index);
	};

	const closeLightbox = () => {
		setCurrentImageIndex(null);
	};

	const goToPrevious = (e) => {
		e.stopPropagation();
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
		);
	};

	const goToNext = (e) => {
		e.stopPropagation();
		setCurrentImageIndex((prevIndex) =>
			prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<>
			<GalleryContainer>
				<h2 className="heading center mb-2">{props.title}</h2>
				<GalleryGrid seeMoreClicked={seeMoreClicked}>
					{props.images.map((image, index) => (
						<GalleryImage
							key={index}
							src={image.mediaItemUrl}
							alt={image.alt || `Gallery image ${index + 1}`}
							onClick={() => handleImageClick(index)}
							span={index === 0 || index === 9 ? 2 : 1}
						/>
					))}
				</GalleryGrid>
				<ButtonWrapper>
					<SeeMoreButton onClick={() => setSeeMoreClicked(true)}>
						SEE MORE
					</SeeMoreButton>
				</ButtonWrapper>
			</GalleryContainer>

			{currentImageIndex !== null && (
				<Lightbox>
					<LightboxContent>
						<ImageLabel>
							Image Pop Up - Horizontal Images
						</ImageLabel>
						<NavButton direction="left" onClick={goToPrevious}>
							←
						</NavButton>
						<LightboxImage
							src={props.images[currentImageIndex].mediaItemUrl}
							alt={
								props.images[currentImageIndex].altText ||
								"Enlarged gallery image"
							}
						/>
						<NavButton direction="right" onClick={goToNext}>
							→
						</NavButton>
						<BottomBar>
							<CloseButton onClick={closeLightbox}>
								Close Gallery
							</CloseButton>
						</BottomBar>
					</LightboxContent>
				</Lightbox>
			)}
		</>
	);
};

export default GallerySection;
