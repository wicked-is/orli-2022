import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const OffersGridContainer = styled.section`
	width: 100%;
	display: inline-block;
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

const ImageBlock = styled.div`
	width: 100%;
	height: 400px;
	z-index: 2;
	position: relative;
	overflow: hidden;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;
	background-repeat: no-repeat !important;

	& .bottomGradient {
		position: absolute;
		z-index: 3;
		bottom: 0px;
		left: 0px;
		right: 0px;
		height: 100%;
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.95) 0%,
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
	}
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

	&:hover .hovershow {
		display: block;
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
	position: absolute;
	bottom: 2rem;
	left: 0rem;
	margin: auto;
	text-align: center;
	width: 100%;
	right: 0rem;
	z-index: 9;
	cursor: pointer;
	transition: 0.3s ease all;

	& .hovershow {
		display: none;
	}

	& .hovershow .colflex {
		display: flex;
		justify-content: space-between;
		padding: 0rem 4rem;
	}

	& .hovershow .colflex a {
		color: #ffffff;
		border-bottom: 1px solid #fff;
		font-family: "GT Walsheim Light";
	}

	@media only screen and (min-width: 1300px) {
		padding-inline: 2rem;
	}

	@media only screen and (max-width: 820px) {
		& .hovershow {
			display: block;
		}
		& .hovershow .colflex,
		& .hovershow p {
			padding: 0rem 2rem;
		}
	}
`;

export default function OffersGrid(props) {
	const { offers, heading } = props;

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
				<h1 className="serif heading black center">{heading}</h1>
			)}
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
								<OffersTitle>
									<p className="serif press-heading white center">
										{offer.title}
									</p>
									<div className="hovershow">
										<p className="sans-serif white body center">
											{offer.singleOffers.highlights}
										</p>
										<div className="colflex">
											<a
												onClick={handleFormFocus}
												target="_blank">
												Book Now
											</a>
											<Link
												href={`/offers/${offer.slug}`}>
												View Offer
											</Link>
										</div>
									</div>
								</OffersTitle>
								<div className="bottomGradient"></div>
							</ImageBlock>
						</OffersTile>
					);
				})}
		</OffersGridContainer>
	);
}
