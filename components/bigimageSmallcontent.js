import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/bigimagesmallcontent.module.css";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const FlexWrapper = styled.div`
	width: 100%;
	margin: auto;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	@media only screen and (max-width: 900px) {
		& {
			flex-direction: column;
			padding-top: 0rem;
		}
		.reorder {
			flex-direction: reverse !important;
		}
	}
`;
const MediaWrapper = styled.div`
	width: 60%;
	position: relative;
	.imgfull {
		width: 100%;
		height: auto !important;
		min-height: unset !important;
		max-height: unset !important;
	}
	.videoBackground {
		height: 60vh;
		overflow: hidden;
		position: relative;
	}
	.videoBackground video {
		width: 100% !important;
		height: auto !important;
	}

	@media only screen and (max-width: 900px) {
		& {
			flex: 1;
			width: 100%;
		}
	}
`;

const ImageCaption = styled.p`
	padding: 0rem 0 0 0;
`;

const TextContainer = styled.div`
	width: 40%;
	margin-bottom: 2rem;
	position: relative;
	@media only screen and (max-width: 900px) {
		& {
			flex: 1;
			width: 100%;
		}
	}
`;

const SliderNavigationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem 0;
`;

export default function BigImageSmallContent(props) {
	const slider = useRef(null);

	const [sliderActive, setSliderActive] = useState(0);
	const [currentSlider, setCurrentSlider] = useState("1");
	const [currentSliderLength, setCurrentSliderLength] = useState("");

	useEffect(() => {
		var bgimgsections = gsap.utils.toArray(".bgimgfade");

		bgimgsections.forEach((bgimgsection) => {
			gsap.to(bgimgsection, {
				autoAlpha: 1,
				scrollTrigger: {
					trigger: bgimgsection,
					start: "+=0 80%",
					scrub: false,
					markers: false,
					toggleActions: "play reverse play reverse",
				},
			});
		});
	}, []);

	useEffect(() => {
		if (slider.current !== null) {
			setCurrentSliderLength(slider.current.cells.length);
			slider.current.on("change", () => {
				setCurrentSlider(slider.current.selectedIndex + 1);
				setCurrentSliderLength(slider.current.cells.length);
			});

			document
				.querySelector("#previous-arrow")
				.addEventListener("click", () => slider.current.previous());
			document
				.querySelector("#next-arrow")
				.addEventListener("click", () => slider.current.next());
		}
	}, [slider]);

	const {
		contentPosition,
		subHeadline,
		greyBackground,
		headline,
		blurb,
		isThereACta,
		ctaLink,
		ctaLabel,
		icon,
		media,
		order,
		anchorTag,
		imageCaption,
		imagePoster,
		paddingType,
		mediaFullWidth,
		mediaType,
		mp4OrExternalLink,
		webm,
		slides,
	} = props;

	const mediacontentStructure = (contentPosition) => {
		switch (contentPosition) {
			case "Left":
				return (
					<div className={`${paddingType} bgimgfade`}>
						{anchorTag && (
							<a
								id={anchorTag}
								name={anchorTag}
								className={styles.anchor}></a>
						)}
						<FlexWrapper>
							<MediaWrapper>
								{mediaType === "Image" && (
									<div className={styles.textPaddingRight}>
										<Image
											src={imagePoster.mediaItemUrl}
											alt={imagePoster.altText}
											width={561}
											height={370}
											layout="responsive"
											className="imgfull"
										/>
										<ImageCaption className="sans-serif body black left">
											{imageCaption}
										</ImageCaption>
									</div>
								)}
								{mediaType === "Slider" && (
									<>
										<Flickity
											options={{
												cellAlign: "center",
												prevNextButtons: false,
												pageDots: false,
												draggable: true,
												wrapAround: true,
												imagesLoaded: true,
												adaptiveHeight: true,
											}}
											disableImagesLoaded={false} // default false
											reloadOnUpdate={false} // default false
											static // default false
											flickityRef={(c) => {
												slider.current = c;
											}}>
											{slides.map((slides, index) => {
												return (
													<div
														key={`slide-${slides.index}`}
														className={
															styles.slides
														}>
														<img
															src={
																slides.mediaItemUrl
															}
															alt={slides.altText}
															className={
																styles.sliderimage
															}
															// layout="intrinsic"
														/>
													</div>
												);
											})}
										</Flickity>
										<SliderNavigationContainer>
											<div className="serif brown">
												{currentSlider}/
												{currentSliderLength}
											</div>
											<div className="brown">
												<img
													id="previous-arrow"
													src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
													style={{
														transform:
															"rotate(180deg)",
														marginRight: "1rem",
														width: "37px",
														height: "22px",
													}}
													alt="previous arrow"
												/>
												<img
													id="next-arrow"
													src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
													style={{
														width: "37px",
														height: "22px",
													}}
													alt="next arrow"
												/>
											</div>
										</SliderNavigationContainer>
									</>
								)}
								{mediaType === "Video" && (
									<div className="videoBackground">
										<video
											className={styles.videoBG}
											autoPlay
											playsInline
											muted
											loop>
											<source
												src={mp4OrExternalLink}
												type="video/mp4"
											/>
											<source
												src={webm}
												type="video/webm"
											/>
										</video>
									</div>
								)}
							</MediaWrapper>
							<TextContainer
								className={`${styles.textPaddingLeft}`}>
								{icon && (
									<p className="right">
										<img
											src={icon?.mediaItemUrl}
											alt={icon?.altText}
											// layout="responsive"
											className={`${styles.leftIcon}`}
										/>
									</p>
								)}
								{subHeadline && (
									<p className="sans-serif sub-heading-bold black">
										{subHeadline}
									</p>
								)}
								{headline && (
									<p className="serif heading black mb-3">
										{headline}
									</p>
								)}
								<div
									className="sans-serif body-copy black"
									dangerouslySetInnerHTML={{
										__html: blurb,
									}}></div>
								{isThereACta && (
									<a
										href={ctaLink}
										className="sans-serif xs-copy black cta-black">
										{ctaLabel}
									</a>
								)}
							</TextContainer>
						</FlexWrapper>
					</div>
				);
			case "Right":
				return (
					<div className={`${paddingType} bgimgfade`}>
						{anchorTag && (
							<a
								id={anchorTag}
								name={anchorTag}
								className={styles.anchor}></a>
						)}
						<FlexWrapper className="reorder">
							<TextContainer
								className={`${styles.textPaddingRight}`}>
								{icon && (
									<p className="right">
										<img
											src={icon?.mediaItemUrl}
											alt={icon?.altText}
											// layout="responsive"
											className={`${styles.rightIcon}`}
										/>
									</p>
								)}
								{subHeadline && (
									<p className="sans-serif sub-heading-bold black">
										{subHeadline}
									</p>
								)}
								{headline && (
									<p className="serif heading black mb-3">
										{headline}
									</p>
								)}
								<div
									className="sans-serif body-copy black"
									dangerouslySetInnerHTML={{
										__html: blurb,
									}}></div>
								{isThereACta && (
									<a
										href={ctaLink}
										className="sans-serif xs-copy black cta-black">
										{ctaLabel}
									</a>
								)}
							</TextContainer>

							<MediaWrapper>
								{mediaType === "Image" && (
									<div className={styles.textPaddingLeft}>
										<Image
											src={imagePoster.mediaItemUrl}
											alt={imagePoster.altText}
											width={561}
											height={370}
											layout="responsive"
											className="imgfull"
										/>
										<ImageCaption className="sans-serif body black left">
											{imageCaption}
										</ImageCaption>
									</div>
								)}
								{mediaType === "Slider" && (
									<>
										<Flickity
											options={{
												cellAlign: "center",
												prevNextButtons: false,
												pageDots: false,
												draggable: true,
												wrapAround: true,
												imagesLoaded: true,
												adaptiveHeight: true,
											}}
											disableImagesLoaded={false} // default false
											reloadOnUpdate={false} // default false
											static // default false
											flickityRef={(c) => {
												slider.current = c;
											}}>
											{slides.map((slides, index) => {
												return (
													<div
														key={`slide-${slides.index}`}
														className={
															styles.slides
														}>
														<img
															src={
																slides.mediaItemUrl
															}
															alt={slides.altText}
															className={
																styles.sliderimage
															}
															// layout="intrinsic"
														/>
													</div>
												);
											})}
										</Flickity>
										<SliderNavigationContainer>
											<div className="serif brown">
												{currentSlider}/
												{currentSliderLength}
											</div>
											<div className="brown">
												<img
													id="previous-arrow"
													src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
													style={{
														transform:
															"rotate(180deg)",
														marginRight: "1rem",
														width: "37px",
														height: "22px",
													}}
													alt="previous arrow"
												/>
												<img
													id="next-arrow"
													src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
													style={{
														width: "37px",
														height: "22px",
													}}
													alt="next arrow"
												/>
											</div>
										</SliderNavigationContainer>
									</>
								)}
								{mediaType === "Video" && (
									<div className="videoBackground">
										<video
											className={styles.videoBG}
											autoPlay
											playsInline
											muted
											loop>
											<source
												src={mp4OrExternalLink}
												type="video/mp4"
											/>
											<source
												src={webm}
												type="video/webm"
											/>
										</video>
									</div>
								)}
							</MediaWrapper>
						</FlexWrapper>
					</div>
				);
			case "Over Background Left":
				return (
					<div
						className={`${styles.flex} ${paddingType} bgimgfade relative`}>
						{anchorTag && (
							<a
								id={anchorTag}
								name={anchorTag}
								className={styles.fullanchor}></a>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}>
								<div className="max-80">
									<div className="flex">
										<div className={styles.col140}>
											{icon && (
												<p className="right">
													<img
														src={icon?.mediaItemUrl}
														alt={icon?.altText}
														// layout="responsive"
														className={`${styles.rightIcon}`}
													/>
												</p>
											)}
											<p className="sans-serif sub-heading-bold white">
												{subHeadline}
											</p>
											<p className="serif heading white mb-3">
												{headline}
											</p>
											<p className="sans-serif body-copy white">
												{blurb}
											</p>
											{ctaLabel && (
												<a
													href={ctaLink}
													className="primary-btn">
													{ctaLabel}
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
						{mediaType === "Video" && (
							<div
								className={`${styles.halfBanner} ${styles.videoBackground} ${styles.backgroundVideo}`}>
								<div className={`${styles.overBackground}`}>
									{icon && (
										<p className="left">
											<img
												src={icon?.mediaItemUrl}
												alt={icon?.altText}
												// layout="responsive"
												className={`${styles.leftIcon}`}
											/>
										</p>
									)}
									<p className="sans-serif sub-heading-bold white  textshadow">
										{subHeadline}
									</p>
									<p className="serif heading white  textshadow">
										{headline}
									</p>
									<p className="sans-serif body-copy white  textshadow">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn">
											{ctaLabel}
										</a>
									)}
								</div>
								<video
									className={styles.videoBG}
									autoPlay
									playsInline
									muted
									loop>
									<source
										src={mp4OrExternalLink}
										type="video/mp4"
									/>
									<source src={webm} type="video/webm" />
								</video>
							</div>
						)}
						{imageCaption && (
							<p className="sans-serif body black left">
								{imageCaption}
							</p>
						)}
					</div>
				);
			case "Over Background Right":
				return (
					<div
						className={`${styles.flex} ${paddingType} bgimgfade relative`}>
						{anchorTag && (
							<a
								id={anchorTag}
								name={anchorTag}
								className={styles.fullanchor}></a>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}>
								<div className={`${styles.overBackgroundLeft}`}>
									{icon && (
										<p className="right">
											<img
												src={icon?.mediaItemUrl}
												alt={icon?.altText}
												// layout="responsive"
												className={`${styles.rightIcon}`}
											/>
										</p>
									)}
									<p className="sans-serif sub-heading-bold white ">
										{subHeadline}
									</p>
									<p className="serif heading white ">
										{headline}
									</p>
									<p className="sans-serif body-copy white ">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn">
											{ctaLabel}
										</a>
									)}
								</div>
							</div>
						)}
						{mediaType === "Video" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundVideo}`}>
								<div
									className={`${styles.overBackground} bgimgfade`}>
									{icon && (
										<p className="right">
											<img
												src={icon?.mediaItemUrl}
												alt={icon?.altText}
												// layout="responsive"
												className={`${styles.rightIcon}`}
											/>
										</p>
									)}
									<p className="sans-serif sub-heading-bold white ">
										{subHeadline}
									</p>
									<p className="serif heading white ">
										{headline}
									</p>
									<p className="sans-serif body-copy white ">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn">
											{ctaLabel}
										</a>
									)}
								</div>
								<video
									className={styles.videoBG}
									autoPlay
									playsInline
									muted
									loop>
									<source
										src={mp4OrExternalLink}
										type="video/mp4"
									/>
									<source src={webm} type="video/webm" />
								</video>
							</div>
						)}
					</div>
				);
			case "Over Background Center":
				return (
					<div
						className={`${styles.flex} ${paddingType} bgimgfade relative`}>
						{anchorTag && (
							<a
								id={anchorTag}
								name={anchorTag}
								className={styles.fullanchor}></a>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}>
								<div className={styles.centerCenterText}>
									<p className="sans-serif sub-heading-bold white center">
										{subHeadline}
									</p>
									<p className="serif heading white center">
										{headline}
									</p>
									<p className="sans-serif body-copy white center">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn">
											{ctaLabel}
										</a>
									)}
								</div>
							</div>
						)}
						{mediaType === "Video" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundVideo}`}>
								<div
									className={`${styles.centerCenterText} bgimgfade`}>
									<p className="sans-serif sub-heading-bold white center">
										{subHeadline}
									</p>
									<p className="serif heading white center">
										{headline}
									</p>
									<p className="sans-serif body-copy white center">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn">
											{ctaLabel}
										</a>
									)}
								</div>
								<video
									className={styles.videoBG}
									autoPlay
									playsInline
									muted
									loop>
									<source
										src={mp4OrExternalLink}
										type="video/mp4"
									/>
									<source src={webm} type="video/webm" />
								</video>
							</div>
						)}
					</div>
				);
			default:
				return null;
		}
	};
	return (
		<section
			className={`${styles.container} ${
				greyBackground !== null && greyBackground == true
					? `bg-lt-grey`
					: null
			}`}>
			{mediacontentStructure(contentPosition)}
		</section>
	);
}
