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
	background-color: var(--dark-brown);
	color: white;
	padding: 20px 40px;
	border: none;
	cursor: pointer;
	font-size: 14px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s ease;
`;

const Lightbox = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #2d3e2f;
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
	align-items: center;
	justify-content: center;
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
	max-width: 90%;
	max-height: calc(100vh - 200px);
	object-fit: contain;

	@media (max-width: 768px) {
		max-width: 85%;
		max-height: calc(100vh - 180px);
	}
`;

const BottomBar = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	/* background-color: rgba(26, 26, 26, 0.95); */
	background-color: #2d3e2f;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NavButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 32px;
	cursor: pointer;
	padding: 10px 20px;
	transition: opacity 0.3s ease;
	line-height: 1;

	&:hover {
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		font-size: 24px;
		padding: 8px 16px;
	}
`;

const CloseButton = styled.button`
	position: absolute;
	right: 20px;
	background: none;
	border: none;
	color: white;
	font-size: 18px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px;
	letter-spacing: 1px;

	&:hover {
		opacity: 0.7;
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
			prevIndex === 0 ? props.images.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = (e) => {
		e.stopPropagation();
		setCurrentImageIndex((prevIndex) =>
			prevIndex === props.images.length - 1 ? 0 : prevIndex + 1,
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
					<SeeMoreButton
						className="sans-serif body-copy uppercase"
						onClick={() => setSeeMoreClicked(true)}>
						SEE MORE
					</SeeMoreButton>
				</ButtonWrapper>
			</GalleryContainer>

			{currentImageIndex !== null && (
				<Lightbox>
					<LightboxContent>
						{/* <ImageLabel>
							Image Pop Up - Horizontal Images
						</ImageLabel> */}
						<LightboxImage
							src={props.images[currentImageIndex].mediaItemUrl}
							alt={
								props.images[currentImageIndex].altText ||
								"Enlarged gallery image"
							}
						/>
						<BottomBar>
							<NavButton onClick={goToPrevious}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="22"
									viewBox="0 0 36 22"
									fill="none">
									<g clip-path="url(#clip0_165_308)">
										<path
											d="M35.8711 10.7649L0.830297 10.7649"
											stroke="white"
											stroke-miterlimit="10"
										/>
										<path
											d="M14.0625 0.288806L0.598694 10.7568L14.0116 21.2249"
											stroke="white"
											stroke-miterlimit="10"
										/>
									</g>
									<defs>
										<clipPath id="clip0_165_308">
											<rect
												width="35.8696"
												height="21.5217"
												fill="white"
												transform="translate(35.8711 21.5217) rotate(-180)"
											/>
										</clipPath>
									</defs>
								</svg>
							</NavButton>
							<NavButton onClick={goToNext}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="22"
									viewBox="0 0 36 22"
									fill="none">
									<g clip-path="url(#clip0_165_305)">
										<path
											d="M0 10.7568H35.0408"
											stroke="white"
											stroke-miterlimit="10"
										/>
										<path
											d="M21.8086 21.2329L35.2724 10.7649L21.8595 0.296875"
											stroke="white"
											stroke-miterlimit="10"
										/>
									</g>
									<defs>
										<clipPath id="clip0_165_305">
											<rect
												width="35.8696"
												height="21.5217"
												fill="white"
											/>
										</clipPath>
									</defs>
								</svg>
							</NavButton>
							<CloseButton
								className="sans-serif"
								onClick={closeLightbox}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="13"
									height="13"
									viewBox="0 0 13 13"
									fill="none">
									<path
										d="M6.114 6.822L0.868 12.068C0.774667 12.1613 0.66 12.2113 0.524 12.218C0.388 12.2247 0.266667 12.1747 0.16 12.068C0.0533332 11.9613 0 11.8433 0 11.714C0 11.5847 0.0533332 11.4667 0.16 11.36L5.406 6.114L0.16 0.868C0.0666665 0.774667 0.0166664 0.66 0.00999975 0.524C0.00333309 0.388 0.0533332 0.266667 0.16 0.16C0.266667 0.0533332 0.384667 0 0.514 0C0.643333 0 0.761333 0.0533332 0.868 0.16L6.114 5.406L11.36 0.16C11.4533 0.0666665 11.5683 0.0166664 11.705 0.00999975C11.8403 0.00333309 11.9613 0.0533332 12.068 0.16C12.1747 0.266667 12.228 0.384667 12.228 0.514C12.228 0.643333 12.1747 0.761333 12.068 0.868L6.822 6.114L12.068 11.36C12.1613 11.4533 12.2113 11.5683 12.218 11.705C12.2247 11.8403 12.1747 11.9613 12.068 12.068C11.9613 12.1747 11.8433 12.228 11.714 12.228C11.5847 12.228 11.4667 12.1747 11.36 12.068L6.114 6.822Z"
										fill="white"
									/>
								</svg>
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
