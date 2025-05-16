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
	max-width: ${(props) => (props.onPage ? "100vw" : "70%")};
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

	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			flex-wrap: unset;
			overflow-y: scroll;
			max-width: ${(props) => (props.onPage ? "100%" : "80%")};
			top: ${(props) => props.onPage && "0"};
			height: ${(props) => props.onPage && "90vh"};
		}
	}
	@media only screen and (max-width: 375px) {
		& {
			height: 80vh;
		}
	}
`;

const ImageContainer = styled.div`
	width: 50%;
	height: 100%;
	overflow: hidden;
	position: relative;

	background: ${(props) =>
		props.bgImage && `url(${props.bgImage}) no-repeat left bottom`};
	background-size: ${(props) => props.bgImage && `cover`};

	& span {
		position: unset !important;
	}

	& .desktop {
		width: unset !important;
		max-width: unset !important;
		min-width: unset !important;
		height: 100% !important;
		min-height: 100% !important;
		max-height: 100% !important;
	}
	img {
		display: none !important;
	}

	@media only screen and (max-width: 1024px) {
		& .desktop {
			margin: 0 0 0 -18rem !important;
		}
	}

	@media only screen and (max-width: 820px) {
		& {
			display: ${(props) => (props.onPage ? "block" : "none")};
			width: ${(props) => props.onPage && "100%"};
		}
	}
`;

const ContentContainer = styled.div`
	width: 50%;
	background: #fff;
	height: 100%;
	position: relative;

	& .close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 999;
	}
	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
			height: auto;
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
		}
	}
`;

export default function ExitIntent(props) {
	const {
		headline = "Love Orli?<br />Let the World Know.",
		bodyCopy = "Show your love and cast your vote for Orli La Jolla in Condé Nast Traveler’s 2025 Readers’ Choice Awards. Just click below, search our name, and submit your vote—you might even win an 8-day Rhine River cruise.",
		isPage,
	} = props;

	return (
		<section>
			<ExitContainer onPage={isPage}>
				<ImageContainer
					onPage={isPage}
					bgImage="https://orlidev.wpengine.com/wp-content/uploads/2025/05/travelers-choice-image-badge.png">
					{/* {!isPage && (
						<Image
							src="https://orlidev.wpengine.com/wp-content/uploads/2025/05/travelers-choice-image-badge.png"
							alt="orli la jolla woman and dog by the window"
							width={1136}
							height={1318}
							layout="intrinsic"
							className="desktop"
						/>
					)} */}
				</ImageContainer>
				<ContentContainer onPage={isPage}>
					{/* Removed Size conditional && size.width > 821  */}
					{!isPage && (
						<div
							className="close"
							onClick={() => {
								props.toggleModal.setHasCondeModalShown(true);
								props.toggleModal.setToggleCondeModal(false);
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
					<TextContainer className="exitForm">
						<h3
							className="serif heading black left"
							dangerouslySetInnerHTML={{ __html: headline }}
						/>
						<p
							className="sans-serif body black left"
							dangerouslySetInnerHTML={{ __html: bodyCopy }}
						/>
						<a
							className="sans-serif body black left submit"
							target="blank"
							rel="noopener noreferrer"
							href="https://condenast-interactive.typeform.com/to/YO7FMWps?typeform-source=www.cntraveler.com">
							Vote Now
						</a>
					</TextContainer>
				</ContentContainer>
			</ExitContainer>
			{!isPage && <ExitUnderlay></ExitUnderlay>}
		</section>
	);
}
