import styled, { css } from "styled-components"

import TitleBar from "./TitleBar"

const GettingHereContainer = styled.section``

export default function GettingHere(props) {
    return (
        <GettingHereContainer>
            <TitleBar title="Getting Here" left/>
        </GettingHereContainer>
    )
}