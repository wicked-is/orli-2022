import styled from "styled-components";
import parse from "html-react-parser";

const ContentBlockMainContainer = styled.section``;
const ContentBlockInnerContainer = styled.div`
	width: 100%;
	max-width: 960px;
	margin-inline: auto;
	margin-top: 5rem;
	margin-bottom: 6rem;

	@media screen and (max-width: 1050px) {
		padding: 0 2rem;
	}
	[data-page="/fall-essentials"] & {
		margin-bottom: 3rem;
	}
	h1,
	h2,
	h3,
	h4 {
		font-size: var(--heading);
		font-family: essonnes-display, serif;
		font-weight: 300;
		line-height: 1.2;
		font-style: normal;
		padding-top: 2rem;
		margin-block-start: 0em;
		margin-block-end: 0em;
	}

	ol li,
	ul li {
		font-family: "GT Walsheim Light";
		color: var(--black);
		font-style: normal;
		font-size: var(--body-copy);
		line-height: 150%;
		padding: 0 0 1rem 0;
	}

	p {
		font-size: var(--body-copy);
		font-family: "GT Walsheim Light";
		line-height: 150%;

		& strong {
			font-family: "GT Walsheim Bold";
		}
	}
	a,
	a:visited,
	a:focus {
		/* color: var(--brown);  */
		text-decoration: underline;
	}

	a.primary {
		display: block;
		width: fit-content;
		color: var(--white);
		background-color: var(--brown);
		border: 1px solid var(--brown);
		padding: 1.3rem 4.5rem;
		margin: 2.5rem auto;
		text-align: center;
		cursor: pointer;
		font-family: "GT Walsheim Light";
		text-transform: uppercase;
		font-size: var(--xs-copy);
		text-decoration: none;
	}

	img {
		max-width: 100%;
		height: 100%;

		&.aligncenter {
			display: block;
			margin: 0 auto;
		}
	}

	figure {
		width: 100%;
		max-width: 100%;
		margin: 0;
	}

	@media only screen and (max-width: 700px) {
		ol {
			margin-block-start: 0em;
			margin-block-end: 0em;
			padding-inline-start: 20px;
		}
	}

	#facebook .PrimaryCTA a {
		color: var(--dark-brown) !important;
	}
`;
// .aligncenter
// image swap
export default function ContentBlock(props) {
	const { anchor, content } = props;
	return (
		<ContentBlockMainContainer>
			<a name={anchor} id={anchor}></a>
			<ContentBlockInnerContainer>
				{parse(content)}
			</ContentBlockInnerContainer>
		</ContentBlockMainContainer>
	);
}
