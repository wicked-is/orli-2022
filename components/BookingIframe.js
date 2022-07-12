import styled from 'styled-components';

const BookingContainer = styled.section`
width: 100%;
margin: auto;
display: inline-block;
position: relative;
padding: 8rem 0rem 6rem 0rem;
`
const IframeContainer = styled.div`
width: 100%;
margin: auto;
text-align: center;
position: relative;
max-width: 80%;
display: block;
padding: 2rem 0rem 0rem 0rem;
`

export default function BookingIframe(props) {
    const {
        blurb,
        headline,
        embed
    } = props

    return (
        <BookingContainer>
                <h1 className="serif heading center">{headline}</h1>
                <p className="sans-serif body-copy center">{blurb}</p>
            <IframeContainer>
                <div dangerouslySetInnerHTML={{ __html: embed }}></div>
            </IframeContainer>
        </BookingContainer>
    )
}