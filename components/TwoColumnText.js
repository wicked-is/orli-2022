import styled from "styled-components";
import parse from "html-react-parser";

const TwoColumnTextContainer = styled.section``;
const FlexContainer = styled.div`
	width: 100%;
	max-width: 960px;
	margin-inline: auto;
	margin-top: 5rem;
	margin-bottom: 6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 6rem;

    .column {
        width: calc(50% - 3rem);

        h1,
        h2,
        h3 {
            font-size: var(--heading);
            font-family: essonnes-display, serif;
            font-weight: 300;
            line-height: 1.2;
            font-style: normal;
            padding-top: 2rem;
            margin-block-start: 0em;
            margin-block-end: 0em;
        }
        h4 {
            font-size: var(--sub-heading);
            letter-spacing: var(--letter-spacing);
            text-transform: uppercase;
            font-family: "GT Walsheim Bold";
            line-height: 150%;
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

        ol li a,
        ol li a:visited,
        ol li a:focus,
        ul li a,
        ul li a:visited,
        ul li a:focus {
                /* color: var(--brown);  */
                text-decoration: underline;
                transition: all 0.3s ease-in-out;
        }
        ol li a:hover {
            color: var(--brown);
        }

        p {
            font-size: var(--body-copy);
            font-family: "GT Walsheim Light";
            line-height: 150%;

            a,
            a:visited,
            a:focus {
                /* color: var(--brown);  */
                text-decoration: underline;
                transition: all 0.3s ease-in-out;
            }
            a:hover {
                color: var(--brown);
            }
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
    }
    
    @media screen and (max-width: 1050px) {
		padding: 0 2rem;
	}
    @media only screen and (max-width: 700px) {
        flex-direction: column;
        gap: 3rem;
        & .column {
            width: 100%;
            padding: 0;
        }
    }
`;
// .aligncenter
// image swap
export default function TwoColumnText(props) {
	const { anchor, content, contentTwo } = props;
	return (
		<TwoColumnTextContainer>
			<a name={anchor} id={anchor}></a>
			<FlexContainer>
                <div className="column">
				    {parse(content)}
                </div>
                <div className="column">
				    {parse(contentTwo)}
                </div>
			</FlexContainer>
		</TwoColumnTextContainer>
	);
}
