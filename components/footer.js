import Image from "next/image"
import Link from 'next/link'

export default function Footer() {
    return (
        <>
            {/* <footer className="footer">
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
            </footer> */}
            <footer className="footer">
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
                                    <Link href="/">Amenities</Link>
                                    <Link href="/">Rooms</Link>
                                    <Link href="/">Location</Link>
                                    <Link href="/">Events</Link>
                                    <Link href="/">Our Story</Link>
                                    <Link href="/">The Journal</Link>
                                    <Link href="/">Gallery</Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p className="sans-serif xs-copy white left mt-0" id="phone-number">T: 123 555 5555<br/>
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
                        <div>
                            <div>
                                <p className="sans-serif copyright xs-copy white left">© 2022 Orli La Jolla | <Link href="/">Privacy Policy</Link> | <Link href="/">Cookie Policy</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
            