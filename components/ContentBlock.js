import styled from 'styled-components';
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

    h2, h3, h4 {
        font-size: var(--heading);
        font-family: essonnes-display, serif;
        font-weight: 300;
        line-height: 1.2;
        font-style: normal;
        padding-top: 2rem;
        margin-block-start: 0em;
        margin-block-end: 0em;
    }
    p {
        font-size: var(--body-copy);
        font-family: 'GT Walsheim Light';
        line-height: 150%;
    }
`

export default function ContentBlock(props) {
    const { anchor, content } = props
    return (
        <ContentBlockMainContainer>
            <a name={anchor} id={anchor}></a>
            <ContentBlockInnerContainer>
                {parse(content)}
            </ContentBlockInnerContainer>
        </ContentBlockMainContainer>
    )
}