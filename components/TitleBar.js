import Image from 'next/image'
import styled from 'styled-components'

const TitleBarContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    max-width: 80%;

    margin-block: 2rem;
    margin-inline: auto;
    padding: 2rem 1rem;
`

export default function TitleBar(props) {
    const { title, icon } = props
    return (
        <TitleBarContainer>
            <Image src={icon.mediaItemUrl} alt={icon.altText} width="100px" height="100px" layout="fixed" />
            <h1>{ title }</h1>
            <Image src={icon.mediaItemUrl} alt={icon.altText}  width="100px" height="100px" layout="fixed" />
        </TitleBarContainer>
    )
}