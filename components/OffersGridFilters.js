import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";
gsap.registerPlugin(ScrollTrigger);

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
        flex: 3;
        width: 100%;
	    display: inline-block;
	    margin: auto;
	    position: relative;
    }

    .sidebar {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 3rem;

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

                li {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    position: relative;
                    padding: 0 0 1rem 0;
                    cursor: pointer;
                    transition: 0.3s ease all;
                }
                li:before {
                    content:'';
                    border: 1px solid #E5E4E2;
                    border-radius: 100%;
                    width: 15px;
                    height: 15px;
                    display: block;
                    transition: 0.3s ease all;
                }
                li:hover:before {
                    border: 1px solid var(--brown);
                    background: var(--brown);
                }
            }
        }
    }
`;
const ImageBlock = styled.div`
	width: 100%;
	height: 300px;
	z-index: 2;
	position: relative;
	overflow: hidden;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;
	background-repeat: no-repeat !important;
`;

const OffersTile = styled.div`
	display: inline;
	width: 31.33%;
	float: left;
	margin: 0.5rem 1% 3rem 1%;
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
			width: 46%;
			margin: 0.5rem 2% 3rem 2%;
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

export default function OffersGridFilters(props) {
	const { offers, upgrades, filters, heading, howToBook } = props;

	useEffect(() => {
		var sections = gsap.utils.toArray(".fadeinpress");

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
	return (
		<OffersGridContainer>
			{heading && (
				<h1 className="serif heading black left">{heading}</h1>
			)}
            <OffersGridFlex>
            <div className="sidebar">
                <div className="filterContainer open">
                    <div className="filterToggle">
                        <p className="sub-heading-bold">Filter By</p>
                        <Image src="https://orlidev.wpengine.com/wp-content/uploads/2025/09/carbon_caret-up.svg" alt="caret" width="20" height="20"/>
                    </div>
                    {filters && filters.map((filter, index) => (
                        <ul key={index}>
                            <li className={`sans-serif body black left ${filter.class}`}>{filter.label}</li>
                        </ul>
                    ))}
                </div>
                {howToBook && (
                    <div className="howtoBook">
                    <p className="sub-heading-bold black left">HOW TO BOOK</p>
                    {parse(`${howToBook}`)}
                    </div>
                )}
            </div>
            <div className="container">
			{offers &&
				offers.map((offer, index) => {
					return (
						<OffersTile
							key={`${index}${offer.slug}`}
							className="fadeinoffers">
							<ImageBlock
								style={{
									backgroundImage: `url(${offer.featuredImage.node.mediaItemUrl})`,
								}}>
							</ImageBlock>
                            <OffersTitle>
									<p className="serif press-heading black left">
										{offer.title}
									</p>
							</OffersTitle>
						</OffersTile>
					);
				})}
                </div>
                </OffersGridFlex>
		</OffersGridContainer>
	);
}