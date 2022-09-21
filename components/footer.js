import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useWindowSize } from "../utils/hooks";
import styled from "styled-components";
import FauxSocialFeed from "./fauxSocialFeed";

const MobileFooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    background: url(https://orlidev.wpengine.com/wp-content/uploads/2022/06/footer-bg.jpg) no-repeat center center;
    background-size: cover !important;
    -webkit-background-size: cover !important;
    -o-background-size: cover !important;
    -ms-background-size: cover !important;
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

export default function Footer(props) {

    const size = useWindowSize();
    
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/', {
            method: 'POST',
            body: JSON.stringify({
                email,
            })
        })
            
        handleResponse(res)
    }

    const handleResponse = async (res) => {
        window.location.href = "/thank-you/";
    }

    return (
        <>
            <FauxSocialFeed image={props.footerImages } />
            { size.width < 768 ? (
                <>
                    <MobileFooterContainer className="mobile-footer">
                    <div className="email-signup">
                                <p className="serif white left">Exclusive Offers, News & Events</p>
                                <form id="emailcapture" onSubmit={handleSubmit}>
                                        <input id="email" 
                                        name="email" 
                                        value={email} 
                                        placeholder="Enter Email*"
                                        onChange={() => setEmail(event.target.value)}
                                        />
                                 <button className="submit">Submit</button>
                                </form>
                        </div>

                        <a href="/">
                        <img
                            className="mobilefooter-logo" 
                            src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="orli logo" />
                        </a>
                        <p className="heading white mb-2">Contact Us</p>
                        <ColumnContainer>
                            <Left>
                                <address className="sans-serif xs-copy white left">
                                    Orli La Jolla<br/>7753 Draper Ave,<br/>La Jolla, CA 92037
                                </address>

                                <GetDirectionsLink className="directions xs-copy white left">
                                    <Link target="_blank" href="https://www.google.com/search?q=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&rlz=1C5CHFA_enUS963US963&oq=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&aqs=chrome..69i57j0i512j69i60l3.816j0j4&sourceid=chrome&ie=UTF-8#">Get Directions</Link>
                                </GetDirectionsLink>
                                <div>
                                    <p className="sans-serif xs-copy white left mt-0" id="phone-number">T: <a href="tel:6195760806">619.576.0806</a><br />E: info@stayorli.com</p>
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
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/08/spotify-brands.svg"
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
                                    <Link href="/find-your-room">Rooms</Link>
                                    <Link href="/amenities">Amenities</Link>
                                    <Link href="/discoveries">Location</Link>
                                    <Link href="/gatherings">Events</Link>
                                    <Link href="/our-story">Story</Link>
                                    <Link href="/the-journal">Journal</Link>
                                    <Link href="/gallery">Gallery</Link>
                                    <Link href="/privacy-policy" className="privacy">Privacy Policy</Link>
                                    <Link href="/cookie-policy">Cookie Policy</Link>
                                    <Link href="/terms-conditions">Terms & Conditions</Link>
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
                                Orli La Jolla<br/>7753 Draper Ave,<br/>La Jolla, CA 92037
                            </address>
                                
                            <p className="directions xs-copy white left">
                                <Link href="https://www.google.com/search?q=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&rlz=1C5CHFA_enUS963US963&oq=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&aqs=chrome..69i57j0i512j69i60l3.816j0j4&sourceid=chrome&ie=UTF-8#">Get Directions</Link>
                            </p>
                        </div>
                    </div>
                    <div>
                    <div>
                        <div className="email-signup">
                                <p className="serif white left">Exclusive Offers, News & Events</p>
                                <form id="emailcapture" action="https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/"  onSubmit={handleSubmit}>
                                    <input id="email" 
                                        name="email" 
                                        value={email} 
                                        placeholder="Enter Email*"
                                        onChange={() => setEmail(event.target.value)}
                                        />
                                    <button className="submit">Submit</button>
                                </form>
                        </div>
                    </div>
                    
                        <div>
                            <div className="footer-links">
                                <Link href="/find-your-room">Rooms</Link>
                                <Link href="/our-story">Story</Link>
                                <Link href="/amenities">Amenities</Link>
                                <Link href="/the-journal">Journal</Link>
                                <Link href="/discoveries">Location</Link>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/gatherings">Events</Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p className="sans-serif xs-copy white left mt-0" id="phone-number">T: <a href="tel:6195760806">619.576.0806</a><br/>
                                    E: <a href="mailto:hello@stayorli.com">hello@stayorli.com</a></p>
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
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/08/spotify-brands.svg"
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
                                <p className="sans-serif copyright xs-copy white left">© 2022 Orli La Jolla | <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/cookie-policy">Cookie Policy</Link> | <Link href="/terms-conditions">Terms & Conditions</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> ) }
        </>
    )
}
            