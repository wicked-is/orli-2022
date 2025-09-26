import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
gsap.registerPlugin(ScrollTrigger);

const FeaturedSliderContainer = styled.section`
    width: 100%;
    display: inline-block;
    margin: -0.5rem auto auto  auto;
    position: relative;
    background-image: url(${props => props['data-background'] || 'none'});
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
    &.Image .column.text p a {color: var(--white) !important;}

    &.Image p:nth-of-type(2),
    &.Image p:nth-of-type(3),
    &.Image p:nth-of-type(4) {
        font-size: var(--body);
        font-family: "GT Walsheim Light";
        line-height: 1.5;
    }
    &.Image .flickity-page-dot.is-selected {
        background: var(--white);
        opacity: 1;
    }
    &.Image .flickity-page-dot {
        background: rgba(255, 255, 255, 0.3);
        opacity: 1;
    }
    & .flickity-button {
        width: 60px;
        height: 60px;

        @media only screen and (max-width: 900px) {
            & {
                width: 40px;
                height: 40px;
                transform: unset;
                top: 20%;
            }
        }
    }
    & .flickity-button:disabled {
        opacity: 0;
    }
    & .flickity-button.flickity-prev-next-button {
        background: transparent;
        @media only screen and (max-width: 900px) {
            & {
                background: rgba(255, 255, 255, 0.7) !important;
            }
        }
    }
    & .flickity-button.flickity-prev-next-button svg {
        fill: var(--brown);
    }
    &.Image .flickity-button.flickity-prev-next-button svg {
        fill: var(--white);
        @media only screen and (max-width: 900px) {
            & {fill: var(--brown);}
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
    background-image: url(${props => props['data-background'] || 'none'});
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
    &.Image p a {color: var(--white) !important;}

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
            background: #E5E4E2;
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
        background: rgba(229,228,226,0.2);
    }
`;

const OffersUpgradesContainer = styled.div`
    width: calc(100% - 6rem);
    display: block;
    margin: auto auto auto 6rem;
    position: relative;

    & .offersSlide {
        width: 33.33%;
        margin-right: 3rem;
    }
    & .featured-story-slider .flickity-prev-next-button {
        width: 60px;
        height: 60px;
    }
    & .featured-story-slider .flickity-prev-next-button .flickity-button-icon {
        fill: var(--brown);
    }
    & .featured-story-slider .flickity-button.flickity-prev-next-button.previous {
        display: none;
    }
    & .featured-story-slider .flickity-button.flickity-prev-next-button.next{
        right: 6rem;
    }
    @media only screen and (max-width: 900px) {
        & {
            width: calc(100% - 4rem);
            margin: auto auto auto 4rem;
        }
        & .offersSlide {
            width: 80%;
            margin-right: 2rem;
        }
        & .featured-story-slider .flickity-button.flickity-prev-next-button.next{
            right: 4rem;
        }
    }
    @media only screen and (max-width: 600px) {
        & {
            width: calc(100% - 2rem);
            margin: auto auto auto 2rem;
        }
        & .featured-story-slider .flickity-prev-next-button {
            width: 40px;
            height: 40px;
        }
        & .featured-story-slider .flickity-button.flickity-prev-next-button.next{
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
        background: rgba(140,54,30,0.5);

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



export default function OffersUpgradesSlider(props) {
    const { offersUpgrades, heading, paddingOptions, backgroundOptions, backgroundImage, sliderType } = props;
    const sliderTilesRef = useRef(null);

    const sliderRef = useRef(null);
    const [sliderActive, setSliderActive] = useState(0); // 0-based index
    const [isOpen, setIsOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    function openModalAt(index) {
    setSliderActive(index);
    if (sliderRef.current && typeof sliderRef.current.select === "function") {
      sliderRef.current.select(index);
    }
    setIsOpen(true);
  }

	function closeModal() {
    setIsOpen(false);
  }

  function changeSlider(e) {
    e.preventDefault();
    const i = Number(e.currentTarget.dataset.slide);
    openModalAt(i);
  }

  function sliderPrevious() {
    if (sliderRef.current) sliderRef.current.previous();
  }

  function sliderNext() {
    if (sliderRef.current) sliderRef.current.next();
  }

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

    // Keep sliderActive in sync with Flickity selection
  useEffect(() => {
    const inst = sliderRef.current;
    if (!inst) return;
    const onChange = (i) => setSliderActive(i);
    inst.on("change", onChange);
    return () => inst.off("change", onChange);
  }, [isOpen]); // bind when modal is open

    return (
        <div>
        { sliderType === 'featuredslider' && ( 
            <FeaturedSliderContainer data-background={backgroundImage?.mediaItemUrl} className={`${paddingOptions} ${backgroundOptions}`}>
                <Flickity
                options={{
                    cellAlign: "left",
                    prevNextButtons: true,
                    pageDots: true,
                    draggable: true,
                    wrapAround: true,
                    percentPosition: true,
                    setGallerySize: true,
                    initialIndex: 1,
                    arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',
                }}
                flickityRef={(c) => (sliderTilesRef.current = c)}
                className="featured-story-slider"
            >
                {offersUpgrades?.map((offer, i) => (
                    <div className="flexContainer" key={`offers-${i}`}>
                        <div className="column image">
                            <Image src={offer?.singleOffers?.offerImage?.mediaItemUrl} alt={offer?.singleOffers?.offerImage?.altText || offer?.title || "Offer Image"} width={600} height={400} layout="responsive" objectFit="cover" />
                        </div>
                        <div className="column text">
                            <p className="sub-heading-bold">Special Offer</p>
                            <h2 className="serif heading left">
                                {offer?.title}
                            </h2>
                            {parse(`${offer?.singleOffers?.offerDescription}`)}
                            <Link href={offer?.singleOffers?.bookingLink || "#"} passHref>
                                <a className="primary-btn left" target={offer?.singleOffers?.bookingLink ? "_blank" : "_self"} rel={offer?.singleOffers?.externalLink ? "noopener noreferrer" : ""}>
                                    Book Now
                                </a>
                            </Link>
                            <p className="sans-serif disclaimerText">Terms & Conditions may apply. <Link href="/terms-conditions" aria-label="View Terms">View Terms</Link></p>
                        </div>
                    </div>
                ))}
            </Flickity>
            </FeaturedSliderContainer>
        )}
        { sliderType === 'popupslider' && (
        <OffersSliderContainer data-background={backgroundImage?.mediaItemUrl} className={`${paddingOptions} ${backgroundOptions}`}>
            {heading && (
				<h2 className="serif heading left"><span>{heading}</span></h2>
			)}
            <OffersUpgradesContainer>
                <Flickity
                options={{
                    cellAlign: "left",
                    prevNextButtons: true,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    percentPosition: true,
                    setGallerySize: true,
                    initialIndex: 1,
                    arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',
                }}
                flickityRef={(c) => (sliderTilesRef.current = c)}
                className="featured-story-slider"
            >
            {offersUpgrades?.map((offer, i) => (
               <div className="offersSlide" key={`${i}${offer?.slug ?? offer?.title ?? "offer"}`}>
                    <ImageBlock>
                        <Image src={offer.featuredImage.node.mediaItemUrl} alt={offer.featuredImage.node.altText} width={600} height={400} layout="responsive" objectFit="cover" />
                        <div className="hoverContainer">
                            <div className="modal" onClick={changeSlider} data-slide={i}>View Details</div>
                        </div>
					</ImageBlock>
                    <OffersTitle>
						<p className="serif press-heading black left" onClick={changeSlider} data-slide={i}>
							{offer.title}
						</p>
					</OffersTitle>
               </div>
            ))}
            </Flickity>
            </OffersUpgradesContainer>
            
            {isOpen && (
            <OffersDialog style={{ display: "block" }}>
                <div>
					<a
						id="closeBtn"
						className="heading"
						onClick={closeModal}
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
					}}
					disableImagesLoaded={false} // default false
					reloadOnUpdate={true} // default false
					static // default false
					flickityRef={(c) => {sliderRef.current = c;}}>
                {offersUpgrades?.map((offer, i) => (
                    <div style={{ width: "100vw" }} key={i}>
                        <ContentContainer>
                        <div style={{backgroundImage: `url(${offer?.featuredImage?.node?.mediaItemUrl})`}}></div>
                            <LeftHalf className="relative">
                                <ModalContentContainer>
                                    <h2 className="heading">{offer?.title}</h2>
                                    <DescriptionContainer className="sans-serif body-copy black variable-height">
                                        {parse(`${offer?.Upgrades?.description}`)}
                                    </DescriptionContainer>
                                </ModalContentContainer>
                                <SliderNavigationContainer>
                                     <NavHolder onClick={sliderPrevious}>
                                        <svg
                                            className="flickity-button-icon"
                                            viewBox="0 0 100 100"
                                            height="30px">
                                            <title>Next</title>
                                            <path
                                                d="M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z"
                                                className="arrow"
                                                fill="var(--brown)"
                                                style={{transformOrigin:"center",}}></path>
                                        </svg>{" "}
                                        <span className="sans-serif body-copy black" style={{marginLeft: ".75rem",}}>
                                            {offersUpgrades[sliderActive - 1]? offersUpgrades[sliderActive - 1]?.title : offersUpgrades[offersUpgrades.length - 1].title}
                                        </span>
                                        </NavHolder>
                                        <NavHolder onClick={sliderNext}>
                                            <span className="sans-serif body-copy black" style={{marginRight: ".75rem",}}>
                                                {offersUpgrades[sliderActive + 1]? offersUpgrades[sliderActive + 1]?.title : offersUpgrades[0]?.title}
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
                ))}
                </Flickity>
            </OffersDialog>
            )}
        </OffersSliderContainer>
        )}
        </div>
    );
}