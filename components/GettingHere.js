import styled, { css } from "styled-components"

import TitleBar from "./TitleBar"

const GettingHereContainer = styled.section`
    display: flex;
    max-width: 80%;
    margin-inline: auto;
`

export default function GettingHere(props) {
    const { title, blurb, image } = props
    return (
        <GettingHereContainer>
            <TitleBar title={title} blurb={blurb} left/>
        </GettingHereContainer>
    )
}