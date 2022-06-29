import Image from "next/image"
import Link from 'next/link'
import Script from "next/script";
import { useEffect } from "react";
import { useWindowSize } from "../utils/hooks";
import styled from "styled-components";

const MobileFooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    background: url(https://orlidev.wpengine.com/wp-content/uploads/2022/06/footer-bg.jpg) no-repeat center center;
    padding: 10% 10% 6rem 10%;
`
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const GetDirectionsLink = styled.p`
    margin: 0 0 1.5rem;
`
const Left = styled.div`
    width: 70%;
    @media only screen and (max-width: 600px){
        width: 60%;
        margin: 0 10% 0 0; 
        address, p {font-size: 0.9rem;}
    }
    .socials {
        padding-top: 1rem;
        padding-bottom: 3rem;
    }
`
const Right = styled.div`
    width: 30%;
    .footer-links {
        grid-template-columns: 1fr;
        font-size: var(--body-copy);
    }
    @media only screen and (max-width: 600px){
        .footer-links {
            font-size: 0.9rem;
        }
        .footer-links .privacy {padding: 5.5rem 0 0.5rem 0;}
    }
`

export default function Footer() {

    const size = useWindowSize();

    return (
        <>
            {
                /* 
                    <footer className="footer">
                        <div className="flex one">
                            <div className="col-1-30">
                                <img
                                className="footer-logo" 
                                src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" 
                                width={380} height={75} 
                                layout="responsive" />
                            </div>
                            <div className="col-1-45">
                            <div className="flex">
                            <div className="col-1-40">
                                        <address className="sans-serif xs-copy white left">
                                        Orli La Jolla<br/>555 Main Street,<br/>La Jolla<br/>California 12345
                                        </address>
                                    
                                            <p className="directions xs-copy white left">
                                            <Link href="/">Get Directions</Link>
                                            </p>
                            </div>
                            <div className="col-1-60 text-padding-left">
                                    <p className="sans-serif xs-copy white left">T: 123 555 5555<br/>
                                    E: email@stayorli.com</p>
                                    <ul className="socials">
                                        <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/instagram-copy.svg"
                                                    alt="Instagram Logo"
                                                    className="instagram"
                                                    width={30}
                                                    height={30} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                                    alt="facebook Logo"
                                                    className="facebook"
                                                    width={14}
                                                    height={30} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/spotify.svg"
                                                    alt="spotify logo"
                                                    className="spotify"
                                                    width={30}
                                                    height={30} />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-25">
                            <div className="footer-links">
                                    <Link href="/">Amenities</Link>
                                    <Link href="/">Rooms</Link>
                                    <Link href="/">Location</Link>
                                    <Link href="/">Events</Link>
                                    <Link href="/">Our Story</Link>
                                    <Link href="/">The Journal</Link>
                                    <Link href="/">Gallery</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex two">
                            <div className="col-1-30">
                            </div>
                            <div className="col-1-45">
                                <p className="sans-serif copyright xs-copy white left">Orli La Jolla All Rights Reserved © 2022</p>
                            </div>
                            <div className="col-1-25">
                                <div className="footer-links-two">
                                    <Link href="/">Privacy Policy</Link>
                                    <Link href="/">Cookie Policy</Link>
                                </div>
                            </div>
                        </div>
                    </footer> 
                */
            }
            <Script id="google-mmaps" src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1WnDACFeekncT34JftC0V8ZvS9P4J4U&callback=initMap&v=weekly`} strategy="afterInteractive" />
            { size.width < 768 ? (
                <>
                    <MobileFooterContainer className="mobile-footer">
                        <p className="heading white mb-2">Contact Us</p>
                        <ColumnContainer>
                            <Left>
                                <address className="sans-serif xs-copy white left">
                                    Orli La Jolla<br/>555 Main Street,<br/>La Jolla<br/>California 12345
                                </address>

                                <GetDirectionsLink className="directions xs-copy white left">
                                    <Link href="/">Get Directions</Link>
                                </GetDirectionsLink>
                                <div>
                                    <p className="sans-serif xs-copy white left mt-0" id="phone-number">T: 123 555 5555<br />E: email@stayorli.com</p>
                                    <ul className="socials">
                                        <li>
                                            <a href="https://www.instagram.com/stayorli/" target="_blank" rel="noopener noreferrer">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/instagram-copy.svg"
                                                    alt="Instagram Logo"
                                                    className="instagram"
                                                    width={30}
                                                    height={30} />
                                            </a>
                                        </li>
                                        {/* <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                                    alt="facebook Logo"
                                                    className="facebook"
                                                    width={14}
                                                    height={30} />
                                            </Link>
                                        </li> */} 
                                        <li>
                                            <a target="_blank" href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=278d0b0810534a75" rel="noopener noreferrer">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/spotify.svg"
                                                    alt="spotify logo"
                                                    className="spotify"
                                                    width={30}
                                                    height={30} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <p className="sans-serif copyright xs-copy white left">© 2022 Orli La Jolla</p>
                            </Left>
                            <Right>
                                <div className="footer-links">
                                    <Link href="/amenities">Amenities</Link>
                                    <Link href="/find-your-room">Rooms</Link>
                                    <Link href="/discoveries">Location</Link>
                                    <Link href="/gatherings">Events</Link>
                                    <Link href="/our-story">Our Story</Link>
                                    <Link href="/the-journal">The Journal</Link>
                                    <Link href="/gallery">Gallery</Link>
                                   
                                    <a href="/privacy-policy" className="privacy">Privacy Policy</a>
                                    <Link href="/cookie-policy">Cookie Policy</Link>
                                </div>
                            </Right>
                        </ColumnContainer>
                    </MobileFooterContainer>
                </>
            ) : ( <footer className="footer desk-footer">
                <div className="inner-container">
                    <div>
                        <div>
                        <img
                            className="footer-logo" 
                            src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" 
                            width={380} height={75} 
                            layout="responsive" />
                        </div>
                        <div>
                            <address className="sans-serif xs-copy white left">
                                Orli La Jolla<br/>555 Main Street,<br/>La Jolla<br/>California 12345
                            </address>
                                
                            <p className="directions xs-copy white left">
                                <Link href="/">Get Directions</Link>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="footer-links">
                                <Link href="/amenities">Amenities</Link>
                                    <Link href="/find-your-room">Rooms</Link>
                                    <Link href="/discoveries">Location</Link>
                                    <Link href="/gatherings">Events</Link>
                                    <Link href="/our-story">Our Story</Link>
                                    <Link href="/the-journal">The Journal</Link>
                                    <Link href="/gallery">Gallery</Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p className="sans-serif xs-copy white left mt-0" id="phone-number">T: 123 555 5555<br/>
                                    E: email@stayorli.com</p>
                                    <ul className="socials">
                                        <li>
                                            <a href="https://www.instagram.com/stayorli/" target="_blank" rel="noopener noreferrer">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/instagram-copy.svg"
                                                    alt="Instagram Logo"
                                                    className="instagram"
                                                    width={30}
                                                    height={30} />
                                            </a>
                                        </li>
                                        {/* <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                                    alt="facebook Logo"
                                                    className="facebook"
                                                    width={14}
                                                    height={30} />
                                            </Link>
                                        </li> */} 
                                        <li>
                                            <a target="_blank" href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=278d0b0810534a75" rel="noopener noreferrer">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/spotify.svg"
                                                    alt="spotify logo"
                                                    className="spotify"
                                                    width={30}
                                                    height={30} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="sans-serif copyright xs-copy white left">© 2022 Orli La Jolla | <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/cookie-policy">Cookie Policy</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> ) }
        </>
    )
}
            