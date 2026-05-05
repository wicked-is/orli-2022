import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const ExitUnderlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0px;
	right: 0px;
	display: block;
	left: 0px;
	bottom: 0px;
	background: rgba(0, 0, 0, 0.5);
	z-index: 998;
`;

const ExitContainer = styled.div`
	position: fixed;
	width: 100%;
	max-width: 900px;
	margin: auto;
	display: flex;
	height: 500px;
	flex-wrap: wrap;
	z-index: 999;
	align-items: center;
	top: ${(props) => (props.onPage ? "64px" : "50%")};
	left: ${(props) => (props.onPage ? "0" : "50%")};
	-ms-transform: ${(props) =>
		props.onPage ? "unset" : "translateY(-50%, -50%)"};
	-webkit-transform: ${(props) =>
		props.onPage ? "unset" : "translateY(-50%, -50%)"};
	transform: ${(props) => {
		return props.onPage ? "unset" : "translate(-50%, -50%)";
	}};

	& .close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 999;
	}

	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			flex-wrap: unset;
			max-width: ${(props) => (props.onPage ? "100%" : "90%")};
			height: 90vh;
		}
		& .close {
			filter: invert(1);
		}
	}
	@media only screen and (max-width: 375px) {
		& {
			height: 90vh;
			justify-content: center;
		}
	}
`;

const ImageContainer = styled.div`
	width: 50%;
	height: 100%;
	overflow: hidden;
	position: relative;

	background: ${(props) =>
		props.bgImage && `url(${props.bgImage}) no-repeat center center`};
	background-size: ${(props) => props.bgImage && `cover`};

	& span {
		position: unset !important;
	}
	img {
		display: none !important;
	}
	& .badge {
		position: absolute !important;
		bottom: 1rem;
		left: 1rem;
		width: 100% !important;
		max-width: 170px !important;
		min-width: unset !important;
		height: unset !important;
		min-height: unset !important;
		max-height: unset !important;
		display: block !important;
	}
	& .desktop {
		width: unset !important;
		max-width: unset !important;
		min-width: unset !important;
		height: 100% !important;
		min-height: 100% !important;
		max-height: 100% !important;
	}

	@media only screen and (max-width: 1024px) {
		& .desktop {
			margin: 0 0 0 -18rem !important;
		}
	}

	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
			height: 100% !important;
			max-height: 400px !important;
			background-position: center 20% !important;
		}
	}
	@media only screen and (max-width: 700px) {
		& {
			width: 100%;
			height: 100% !important;
			max-height: 300px !important;
			background-position: center 20% !important;
		}
		& .badge {
			position: absolute !important;
			bottom: 1rem;
			left: 1rem;
			width: 100% !important;
			max-width: 100px !important;
			min-width: unset !important;
			height: unset !important;
			min-height: unset !important;
			max-height: unset !important;
			display: block !important;
		}
	}
`;

const ContentContainer = styled.div`
	width: 50%;
	background: #fff;
	height: 100%;
	position: relative;

	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
			height: 100%;
		}
	}
`;

const TextContainer = styled.div`
	padding: 4rem;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	-ms-transform: translateY(-50%, -50%);
	-webkit-transform: translateY(-50%, -50%);
	transform: translate(-50%, -50%);

	& #firstname,
	& #lastname,
	& #email {
		border-left: 0px;
		color: var(--black);
		width: 100%;
		border-top: 0px;
		font-size: var(--body);
		border-right: 0px;
		border-bottom: 1px solid var(--black);
		padding: 1rem 0rem;
		font-family: "GT Walsheim Light";
	}
	.submit {
		background: var(--brown);
		color: var(--white);
		text-transform: uppercase;
		padding: 1rem 2rem;
		border: 0px;
		margin: 2rem auto 0 0;
		font-family: "GT Walsheim Light";
		font-size: var(--xs-copy);
		display: block;
		width: fit-content;
	}

	@media only screen and (max-width: 1220px) {
		& {
			position: relative;
			padding: 3rem 2rem;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			position: relative;
			padding: 4rem 2rem;
			overflow-y: auto;
		}
	}
`;

export default function ExitIntent(props) {
	const {
		headline = "Love Orli?<br />Let the World Know.",
		bodyCopy = "We’re nominated again this year in Condé Nast Traveler’s 2026 Readers’ Choice Awards — and it’s all thanks to guests like you. Click below, search our name, and submit your vote. You might even win a 15-day British Isles cruise.",
		isPage,
	} = props;

	return (
		<section>
			<ExitContainer onPage={isPage}>
				{!isPage && (
						<div
							className="close"
							onClick={() => {
								props.toggleModal.setHasGenericModalShown(true);
								props.toggleModal.setToggleGenericModal(false);
							}}
							style={{ cursor: "pointer" }}>
							<Image
								src="https://orlidev.wpengine.com/wp-content/uploads/2022/11/close-icon.svg"
								alt="close"
								width={30}
								height={30}
								layout="intrinsic"
							/>
						</div>
					)}
				<ImageContainer
					onPage={isPage}
					bgImage="https://orlidev.wpengine.com/wp-content/uploads/2026/05/orli-la-jolla-travel-leisure-popup-image.jpg">
						<Image
							src="https://orlidev.wpengine.com/wp-content/uploads/2026/05/CNRC2026-1.png"
							alt="Conde Nast Traveler Readers Choice awards 2026 vote now badge"
							width={170}
							height={164}
							layout="intrinsic"
							className="badge"
						/>
				</ImageContainer>
				<ContentContainer onPage={isPage}>
					{/* Removed Size conditional && size.width > 821  */}
					<TextContainer className="exitForm">
						<h3
							className="serif heading black"
							dangerouslySetInnerHTML={{ __html: headline }}
						/>
						<p
							className="sans-serif body black"
							dangerouslySetInnerHTML={{ __html: bodyCopy }}
						/>
						<a
							className="sans-serif body black submit"
							target="blank"
							rel="noopener noreferrer"
							href="https://www.cntraveler.com/story/vote-readers-choice-awards">
							Vote Now
						</a>
					</TextContainer>
				</ContentContainer>
			</ExitContainer>
			{!isPage && <ExitUnderlay></ExitUnderlay>}
		</section>
	);
}
