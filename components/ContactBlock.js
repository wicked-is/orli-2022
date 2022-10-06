import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ContactBlockMainContainer = styled.section`
    width: 100%;
    margin: -0.5rem auto auto auto;
    display: inline-block;
    height: auto;
    padding: 4rem 5.5rem 8rem 5.5rem;
    background-position: center center;
    background-size: cover !important;
    -webkit-background-size: cover !important;
    -moz-background-size: cover !important;
    -o-background-size: cover !important;
    -ms-background-size: cover !important;

    @media only screen and (max-width: 820px) {
        & {
            padding: 4rem 4rem 8rem 4rem;
        }
    }
`

const ContactBlockInnerContainer = styled.div`  
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 80%;

    @media only screen and (max-width: 1280px) {
        & {
            max-width: 85%;
        }
    }

    @media only screen and (max-width: 820px) {
        & {max-width: 100%;}
    }
`

const Column = styled.div`
    padding: 0 2.5rem 0 0;
    width: 25%;

    & a:visited, 
    & a:focus {color: var(--white);}
    
    & .res-padding {padding: 0.3rem 0 0 0;}

    @media only screen and (max-width: 1024px) {
        & .res-padding {padding: 0rem 0 0 0;}
        & {
            width: 50%;
            padding: 0 0rem 0 0;
        }
    }
    @media only screen and (max-width: 620px) {
        & {
            width: 100%;
            padding: 0 0rem 0 0;
        }
    }
`
export default function ContactBlock(props) {
    const { 
        reservationsBlurb,
        eventsBlurb,
        mediaBlurb,
        developmentBlurb,
        backgroundImage
    } = props

    return (
        <ContactBlockMainContainer style={{
            backgroundImage: `url(${backgroundImage.mediaItemUrl})`
        }}>
            <ContactBlockInnerContainer>
                <Column>
                    <p className="sans-serif sub-heading-bold white uppercase left">Reservations</p>
                    <div className="res-padding sans-serif body-copy white left" dangerouslySetInnerHTML={{ __html: reservationsBlurb}}></div>
                </Column>

                <Column>
                    <p className="sans-serif sub-heading-bold white uppercase left">Events & General Inquiries</p>
                    <div className="sans-serif body-copy white left" dangerouslySetInnerHTML={{ __html: eventsBlurb}}></div>
                </Column>

                <Column>
                    <p className="sans-serif sub-heading-bold white uppercase left">MEDIA/PR</p>
                    <div className="res-padding sans-serif body-copy white left" dangerouslySetInnerHTML={{ __html: mediaBlurb}}></div>
                </Column>

                <Column>
                    <p className="sans-serif sub-heading-bold white uppercase left">Development Opportunities</p>
                    <div className="sans-serif body-copy white left" dangerouslySetInnerHTML={{ __html: developmentBlurb}}></div>
                </Column>
            </ContactBlockInnerContainer>
        </ContactBlockMainContainer>
    )
}