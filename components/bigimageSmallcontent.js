import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/bigimagesmallcontent.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
	const swiperRef = useRef(null);

	const [currentSlider, setCurrentSlider] = useState(1);
	const [currentSliderLength, setCurrentSliderLength] = useState(0);

	useEffect(() => {
		var bgimgsections = gsap.utils.toArray(".bgimgfade");

		bgimgsections.forEach((bgimgsection) => {
			gsap.to(bgimgsection, {
				autoAlpha: 1,
				scrollTrigger: {
					trigger: bgimgsection,
					start: "+=0 90%",
					scrub: false,
					markers: false,
					toggleActions: "play reverse play reverse",
				},
			});
		});
	}, []);

	const handleSlideChange = (swiper) => {
		setCurrentSlider(swiper.activeIndex + 1);
	};

	const handlePrevious = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

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
							<div id={anchorTag} className={styles.anchor}></div>
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
										<Swiper
											modules={[
												Navigation,
												Pagination,
												Keyboard,
											]}
											spaceBetween={0}
											slidesPerView={1}
											loop={true}
											centeredSlides={true}
											keyboard={{
												enabled: true,
												onlyInViewport: true,
											}}
											onSwiper={(swiper) => {
												swiperRef.current = swiper;
												setCurrentSliderLength(
													slides.length,
												);
											}}
											onSlideChange={handleSlideChange}
											className={styles.slides}>
											{slides.map((slide, index) => {
												return (
													<SwiperSlide
														key={`slide-${index}`}>
														<img
															src={
																slide.mediaItemUrl
															}
															alt={slide.altText}
															className={
																styles.sliderimage
															}
														/>
													</SwiperSlide>
												);
											})}
										</Swiper>
										<SliderNavigationContainer>
											<div
												className="serif brown"
												aria-live="polite"
												aria-atomic="true">
												{currentSlider} /{" "}
												{currentSliderLength}
											</div>
											<div className="brown">
												<button
													onClick={handlePrevious}
													aria-label="Previous slide"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: 0,
													}}>
													<img
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
														style={{
															transform:
																"rotate(180deg)",
															marginRight: "1rem",
															width: "37px",
															height: "22px",
														}}
														alt=""
														aria-hidden="true"
													/>
												</button>
												<button
													onClick={handleNext}
													aria-label="Next slide"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: 0,
													}}>
													<img
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
														style={{
															width: "37px",
															height: "22px",
														}}
														alt=""
														aria-hidden="true"
													/>
												</button>
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
									<div aria-hidden="true">
										<img
											src={icon?.mediaItemUrl}
											alt=""
											className={`${styles.leftIcon}`}
										/>
									</div>
								)}
								{subHeadline && (
									<h3 className="sans-serif sub-heading-bold black">
										{subHeadline}
									</h3>
								)}
								{headline && (
									<h2 className="serif heading black mb-3">
										{headline}
									</h2>
								)}
								<div
									className="sans-serif body-copy black"
									dangerouslySetInnerHTML={{
										__html: blurb,
									}}></div>
								{isThereACta && (
									<a
										href={ctaLink}
										className="sans-serif xs-copy black cta-black"
										aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
							<div id={anchorTag} className={styles.anchor}></div>
						)}
						<FlexWrapper className="reorder">
							<TextContainer
								className={`${styles.textPaddingRight}`}>
								{icon && (
									<div aria-hidden="true">
										<img
											src={icon?.mediaItemUrl}
											alt=""
											className={`${styles.rightIcon}`}
										/>
									</div>
								)}
								{subHeadline && (
									<h3 className="sans-serif sub-heading-bold black">
										{subHeadline}
									</h3>
								)}
								{headline && (
									<h2 className="serif heading black mb-3">
										{headline}
									</h2>
								)}
								<div
									className="sans-serif body-copy black"
									dangerouslySetInnerHTML={{
										__html: blurb,
									}}></div>
								{isThereACta && (
									<a
										href={ctaLink}
										className="sans-serif xs-copy black cta-black"
										aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
										<Swiper
											modules={[
												Navigation,
												Pagination,
												Keyboard,
											]}
											spaceBetween={0}
											slidesPerView={1}
											loop={true}
											centeredSlides={true}
											keyboard={{
												enabled: true,
												onlyInViewport: true,
											}}
											onSwiper={(swiper) => {
												swiperRef.current = swiper;
												setCurrentSliderLength(
													slides.length,
												);
											}}
											onSlideChange={handleSlideChange}
											className={styles.slides}>
											{slides.map((slide, index) => {
												return (
													<SwiperSlide
														key={`slide-${index}`}>
														<img
															src={
																slide.mediaItemUrl
															}
															alt={slide.altText}
															className={
																styles.sliderimage
															}
														/>
													</SwiperSlide>
												);
											})}
										</Swiper>
										<SliderNavigationContainer>
											<div
												className="serif brown"
												aria-live="polite"
												aria-atomic="true">
												Slide {currentSlider} of{" "}
												{currentSliderLength}
											</div>
											<div className="brown">
												<button
													onClick={handlePrevious}
													aria-label="Previous slide"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: 0,
													}}>
													<img
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
														style={{
															transform:
																"rotate(180deg)",
															marginRight: "1rem",
															width: "37px",
															height: "22px",
														}}
														alt=""
														aria-hidden="true"
													/>
												</button>
												<button
													onClick={handleNext}
													aria-label="Next slide"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: 0,
													}}>
													<img
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
														style={{
															width: "37px",
															height: "22px",
														}}
														alt=""
														aria-hidden="true"
													/>
												</button>
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
							<div
								id={anchorTag}
								className={styles.fullanchor}></div>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}
								role="img"
								aria-label={
									imagePoster?.altText || "Background image"
								}>
								<div className="max-80">
									<div className="flex">
										<div className={styles.col140}>
											{icon && (
												<div aria-hidden="true">
													<img
														src={icon?.mediaItemUrl}
														alt=""
														className={`${styles.rightIcon}`}
													/>
												</div>
											)}
											{subHeadline && (
												<h3 className="sans-serif sub-heading-bold white">
													{subHeadline}
												</h3>
											)}
											<h2 className="serif heading white mb-3">
												{headline}
											</h2>
											<p className="sans-serif body-copy white">
												{blurb}
											</p>
											{ctaLabel && (
												<a
													href={ctaLink}
													className="primary-btn"
													aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
										<div aria-hidden="true">
											<img
												src={icon?.mediaItemUrl}
												alt=""
												className={`${styles.leftIcon}`}
											/>
										</div>
									)}
									{subHeadline && (
										<h3 className="sans-serif sub-heading-bold white textshadow">
											{subHeadline}
										</h3>
									)}
									<h2 className="serif heading white textshadow">
										{headline}
									</h2>
									<p className="sans-serif body-copy white textshadow">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn"
											aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
							<div
								id={anchorTag}
								className={styles.fullanchor}></div>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}
								role="img"
								aria-label={
									imagePoster?.altText || "Background image"
								}>
								<div className={`${styles.overBackgroundLeft}`}>
									{icon && (
										<div aria-hidden="true">
											<img
												src={icon?.mediaItemUrl}
												alt=""
												className={`${styles.rightIcon}`}
											/>
										</div>
									)}
									{subHeadline && (
										<h3 className="sans-serif sub-heading-bold white ">
											{subHeadline}
										</h3>
									)}
									<h2 className="serif heading white ">
										{headline}
									</h2>
									<p className="sans-serif body-copy white ">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn"
											aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
										<div aria-hidden="true">
											<img
												src={icon?.mediaItemUrl}
												alt=""
												className={`${styles.rightIcon}`}
											/>
										</div>
									)}
									{subHeadline && (
										<h3 className="sans-serif sub-heading-bold white ">
											{subHeadline}
										</h3>
									)}
									<h2 className="serif heading white ">
										{headline}
									</h2>
									<p className="sans-serif body-copy white ">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn"
											aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
							<div
								id={anchorTag}
								className={styles.fullanchor}></div>
						)}
						{mediaType === "Image" && (
							<div
								className={`${styles.halfBanner} ${styles.backgroundImage}`}
								style={{
									backgroundImage: `url(${imagePoster.mediaItemUrl})`,
								}}
								role="img"
								aria-label={
									imagePoster?.altText || "Background image"
								}>
								<div className={styles.centerCenterText}>
									{subHeadline && (
										<h3 className="sans-serif sub-heading-bold white center">
											{subHeadline}
										</h3>
									)}
									<h2 className="serif heading white center">
										{headline}
									</h2>
									<p className="sans-serif body-copy white center">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn"
											aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
									{subHeadline && (
										<h3 className="sans-serif sub-heading-bold white center">
											{subHeadline}
										</h3>
									)}
									<h2 className="serif heading white center">
										{headline}
									</h2>
									<p className="sans-serif body-copy white center">
										{blurb}
									</p>
									{isThereACta && (
										<a
											href={ctaLink}
											className="primary-btn"
											aria-label={`${ctaLabel}${headline ? ` - ${headline}` : ""}`}>
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
			}`}
			aria-label={headline || subHeadline || "Content section"}>
			{mediacontentStructure(contentPosition)}
		</section>
	);
}
