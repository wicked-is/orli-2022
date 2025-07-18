import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import styled from "styled-components";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

export const UpgradesGridPageQuery = `
    ... on Page_Flexiblecontent_Sections_UpgradesGrid {
        fieldGroupName
        title
        tileCtaText
        modalSubtitle
        upgrades {
            ... on Upgrade {
                title
                Upgrades {
                  description
                  externalLink
                }
                featuredImage {
                  node {
                    altText
                    mediaItemUrl                
                  }
                }
            }
        }
    }
`;

export const UpgradesGridPostQuery = `
    ... on Post_Flexiblecontent_Sections_UpgradesGrid {
        fieldGroupName
        title
        tileCtaText
        modalSubtitle
        upgrades {
            ... on Upgrade {
                title
                Upgrades {
                  description
                  externalLink
                }
                featuredImage {
                  node {
                    altText
                    mediaItemUrl                
                  }
                }
            }
        }
    }
`;

const UpgradesGridMainContainer = styled.section`
	background-color: ${(props) =>
		props.index % 2 === 0 ? "var(--white)" : "var(--white)"};
	padding: 6rem 5.5rem 6rem 5.5rem;

	@media screen and (max-width: 820px) {
		padding: 6rem 3.5rem;
	}

	@media screen and (max-width: 600px) {
		padding: 6rem 2rem;
	}
`;

const UpgradesGridContainer = styled.div`
	width: 100%;
	display: inline-block;
	margin: auto;
	position: relative;
`;

const UpgradesGridInner = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin-top: 2rem;
	gap: 1rem;

	@media screen and (max-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media screen and (max-width: 976px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (max-width: 676px) {
		grid-template-columns: 1fr;
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

const OffersDialog = styled.dialog`
	width: 100%;
	height: 100%;
	border: 0;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	z-index: 9999999999;

	@media screen and (max-width: 500px) {
		padding: 0;
	}
`;

const LeftHalf = styled.div`
	@media screen and (max-width: 768px) {
		padding-top: 3rem;
	}
`;

const Gradient = styled.div`
	position: absolute;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	right: 0px;
	height: 9rem;
	background: rgb(0, 0, 0);
	background: -moz-linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(255, 255, 255, 0) 100%
	);
	background: -webkit-linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(255, 255, 255, 0) 100%
	);
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(255, 255, 255, 0) 100%
	);
`;

export const SliderNavigationContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 2.5rem 3rem;
	justify-content: space-between;

	@media screen and (max-width: 500px) {
		padding: 1.5rem 5vw 0;
	}
`;

const ModalContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto 15%;

	.variable-height {
		flex: 1;
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

export const NavHolder = styled.div`
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

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	min-height: 347px;

	&:hover .hovershow {
		display: block;
		position: absolute;
		bottom: 0;
		width: 100%;

		p {
			color: white;
		}
	}
`;

const HoverShow = styled.div`
	display: none;
	z-index: 5;
	text-align: center;

	p {
		color: #ffffff;
		margin: 0 auto 1rem;
		border-bottom: 1px solid #fff;
		font-family: "GT Walsheim Light";
		width: fit-content;
	}
`;

const DescriptionContainer = styled.div`
	a {
		text-decoration: underline;
	}
`;

export default function UpgradesGrid(props) {
	const { anchor, title, upgrades, tileCtaText, modalSubtitle, index } =
		props;

	const slider = useRef(null);
	const [sliderActive, setSliderActive] = useState(1);
	const [loaded, setLoaded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [dimensions, setDimensions] = useState({
		height: null,
		width: null,
	});

	function changeSlider(e) {
		let modalBox = document.querySelector(`#UpgradeSliderDialog-${index}`);
		e.preventDefault();
		setSliderActive(e.target.dataset.slide);
		slider.current.select(e.target.dataset.slide);
		openModalBox();
	}

	function openModalBox() {
		let modalBox = document.querySelector(`#UpgradeSliderDialog-${index}`);
		modalBox.show();
	}

	function closeModalBox() {
		let modalBox = document.querySelector(`#UpgradeSliderDialog-${index}`);
		modalBox.close();
	}

	function sliderPrevious() {
		slider.current.previous();
	}

	function sliderNext() {
		slider.current.next();
	}

	useEffect(() => {
		const closeButton = document.querySelector("#closeBtn");

		closeButton.addEventListener("click", () => {
			document.querySelector("dialog").close();
		});

		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});

			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		}

		window.addEventListener("resize", handleResize);

		return (_) => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		slider.current.on("change", () => {
			setSliderActive(slider.current.selectedIndex);
		});
	}, [sliderActive]);

	return (
		<UpgradesGridMainContainer index={index}>
			<a
				aria-hidden="true"
				aria-label={`anchor link ${
					index === 0
						? "offers"
						: index === 1
						? "stay-enhancing-upgrades"
						: "perks"
				}`}
				tabIndex={-1}
				className="anchor"
				id={
					index === 0
						? "offers"
						: index === 1
						? "stay-enhancing-upgrades"
						: "perks"
				}
				href=""></a>
			<h2 className="serif heading black center">{title}</h2>
			<UpgradesGridContainer>
				<UpgradesGridInner>
					{upgrades.map((upgrade, index) => {
						return (
							<div
								key={index}
								className="center"
								style={{ cursor: "pointer" }}>
								<ImageContainer>
									<Image
										layout="fill"
										objectFit="cover"
										src={
											upgrade?.featuredImage?.node
												?.mediaItemUrl
										}
										alt={
											upgrade?.featuredImage?.node
												?.altText
										}
										data-slide={index}
										style={{
											objectFit: "cover !important",
										}}
										onClick={changeSlider}
									/>
									<HoverShow
										className="hovershow"
										onClick={changeSlider}
										data-slide={index}>
										<p
											onClick={changeSlider}
											data-slide={index}>
											{tileCtaText}
										</p>
									</HoverShow>
									<Gradient />
								</ImageContainer>
								<h3
									className="serif press-heading center"
									data-slide={index}>
									{upgrade?.title}
								</h3>
							</div>
						);
					})}
				</UpgradesGridInner>
			</UpgradesGridContainer>
			<OffersDialog id={`UpgradeSliderDialog-${index}`}>
				<div>
					<a
						id="closeBtn"
						className="heading"
						onClick={closeModalBox}
						style={{
							fontSize: "2rem",
							margin: 0,
							position: "absolute",
							right: "2rem",
							top: "2rem",
							zIndex: 999999,
							color: "white",
						}}>
						&#10005;
					</a>
				</div>
				<Flickity
					options={{
						cellAlign: "center",
						prevNextButtons: false,
						pageDots: false,
						draggable: false,
						wrapAround: true,
						imagesLoaded: true,
						initialIndex: sliderActive,
						// arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',
						// fullscreen: true,
						// autoPlay: 5000,
					}}
					disableImagesLoaded={false} // default false
					reloadOnUpdate={true} // default false
					static // default false
					flickityRef={(c) => {
						slider.current = c;
					}}>
					{upgrades.map((upgrade, index) => {
						return (
							<div style={{ width: "100vw" }} key={index}>
								<ContentContainer>
									<div
										style={{
											backgroundImage: `url(${upgrade?.featuredImage?.node?.mediaItemUrl})`,
										}}></div>
									<LeftHalf className="relative">
										<ModalContentContainer>
											<p className="sans-serif-bold sub-heading">
												{modalSubtitle}
											</p>
											<h2 className="heading">
												{upgrade?.title}
											</h2>
											<DescriptionContainer className="sans-serif body-copy black variable-height">
												{parse(
													upgrade.Upgrades.description
												)}
											</DescriptionContainer>
											{/* <a
                                                    className="sans-serif uppercase text-link"
                                                    style={{
                                                        width: '215px',
                                                        height: '69px',
                                                        color: '#fff',
                                                        fontSize: 'var(--xs-copy)',
                                                        border: 0,
                                                        backgroundColor: 'var(--brown)',
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`${upgrade.Upgrades.externalLink}`}>
                                                    Book Now
                                                </a> */}
										</ModalContentContainer>
										<SliderNavigationContainer>
											<NavHolder
												onClick={() =>
													sliderPrevious()
												}>
												<svg
													className="flickity-button-icon"
													viewBox="0 0 100 100"
													height="30px">
													<title>Next</title>
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
														marginLeft: ".75rem",
													}}>
													{upgrades[sliderActive - 1]
														? upgrades[
																sliderActive - 1
														  ]?.title
														: upgrades[
																upgrades.length -
																	1
														  ].title}
												</span>
											</NavHolder>
											<NavHolder
												onClick={() => sliderNext()}>
												<span
													className="sans-serif body-copy black"
													style={{
														marginRight: ".75rem",
													}}>
													{upgrades[sliderActive + 1]
														? upgrades[
																sliderActive + 1
														  ]?.title
														: upgrades[0]?.title}
												</span>{" "}
												<svg
													className="flickity-button-icon"
													viewBox="0 0 100 100"
													height="30px">
													<title>Next</title>
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
							</div>
						);
					})}
				</Flickity>
			</OffersDialog>
		</UpgradesGridMainContainer>
	);
}
