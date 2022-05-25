import Image from 'next/image'
import styled, { css } from 'styled-components'

const TitleBarContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 80%;
    margin-inline: auto;
    
    margin-block: 2rem;
    padding: 2rem 1rem;

    ${props => props.left && css`
        margin-inline: initial !important;
        max-width: 100%; 
        padding: 0;
    `}
`

export default function TitleBar(props) {
    const { title, icon } = props
    return (
        <TitleBarContainer>
            { icon && <Image src={icon.mediaItemUrl} alt={icon.altText} width="100px" height="100px" layout="fixed" /> }
            <h1 className="heading">{ title }</h1>
            { icon && <Image src={icon.mediaItemUrl} alt={icon.altText}  width="100px" height="100px" layout="fixed" /> }
        </TitleBarContainer>
    )
}