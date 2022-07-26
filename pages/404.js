import Link from "next/link"
import styled from "styled-components"

const FullSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 65vh;
    padding-top: 4rem;
`
const Title = styled.p`
    font-weight: 400;
    font-style: normal;
    color: ${props => props.white ? '#fff' : '#000'};
    font-size: var(--headline);
    margin-top: 0;
    margin-bottom: ${props => props.mb ? '3rem' : '.5rem'};
    z-index: 1;
`
const StyledLink = styled.a`
    color: white;
    text-transform: uppercase;
    text-decoration: underline;
`

export default function PageNotFound(props) {
    return (
        <FullSection>
            <>
                <Title white mb>This page cannot be found.</Title>
                <Link href="/" passHref>
                    <StyledLink>Visit Home</StyledLink>
                </Link>
            </>
        </FullSection>
    )
}