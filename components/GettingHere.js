import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import styles from "../styles/GettingHere.module.css";
import styled from "styled-components";

const MainMap = styled.div`
	width: 100%;
	height: 500px;
`;

const BlurbContainer = styled.p`
	max-width: 60%;

	@media screen and (max-width: 800px) {
		max-width: 100%;
	}
`;

export default function GettingHere({
	title,
	blurb,
	gettinghereimage,
	gettinghereimagemobile,
}) {
	return (
		<section className={styles.container}>
			<div className="max-80">
				{title && <p className="heading">{title}</p>}
				{blurb && (
					<BlurbContainer className="sans-serif body-copy black">
						{blurb}
					</BlurbContainer>
				)}
			</div>
			{gettinghereimage && (
				<img
					className={styles.ghimg}
					src={gettinghereimage.mediaItemUrl}
					alt={gettinghereimage.altText}
				/>
			)}
			{gettinghereimagemobile && (
				<img
					className={styles.ghimgmobile}
					src={gettinghereimagemobile.mediaItemUrl}
					alt={gettinghereimagemobile.altText}
				/>
			)}
		</section>
	);
}
