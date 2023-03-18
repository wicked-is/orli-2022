import Image from "next/image";
import styled, { css } from "styled-components";

const TitleBarContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;

	max-width: 80%;
	margin-inline: auto;

	margin-block: 2rem;
	padding: 2rem 1rem;

	@media screen and (max-width: 900px) {
		padding-top: 0;
	}
`;

export default function TitleBar(props) {
	const { title, icon, center, blurb, showIcons, anchor } = props;

	return (
		<TitleBarContainer>
			{anchor ? (
				<a
					id={anchor}
					style={{ position: "relative", top: "-150px" }}></a>
			) : null}
			{showIcons && (
				<Image
					src={icon.mediaItemUrl}
					alt={icon.altText}
					width="100px"
					height="100px"
					layout="fixed"
				/>
			)}
			<h1 className="heading">{title}</h1>
			{blurb && (
				<p className="sans-serif sub-heading-bold black">{blurb}</p>
			)}
			{showIcons && (
				<Image
					src={icon.mediaItemUrl}
					alt={icon.altText}
					width="100px"
					height="100px"
					layout="fixed"
				/>
			)}
		</TitleBarContainer>
	);
}
