import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import styles from '../styles/header.module.css';

export default function Header() {
    const [navIsOpen, setNavIsOpen] = useState(false);

    function toggleNav() {
        setNavIsOpen(!navIsOpen)
    }

    function handleClick(e, path) {
        e.preventDefault();

        toggleNav();

        window.location = path;
    }

    return (
        <header className={`${styles.header} ${navIsOpen ? styles.open : ''}`}>
            
            {/* This is the analytics snipet
            
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=UA-#########-#"
                    strategy="afterInteractive"
                />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-#########-#');
                `}
            </Script> */}
            <Head>
                {/* Head elements required on every page */}
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.sitebranding}>

                <img className={styles.close} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/white-copy.svg" alt="close icon" onClick={() => toggleNav()} />

                <div className={styles.announcementbar}>
                    <p className="sans-serif white xs-copy center">Lorem Ipsum Sed Ud Et Lorem</p>
                </div>
                
                <Link href="/">
                    <img
                        src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
                        alt="Orli La Jolla Logo"
                        className={styles.headerlogo}
                        width={380}
                        height={95}
                        />
                </Link>

                <Link href="/">
                    <div className={styles.primarybutton}>
                        <p className="sans-serif xs-copy white center uppercase">Find Your Room</p>
                    </div>
                </Link>

                <div className="hamburger hamburger--collapse" type="button" onClick={() => toggleNav()}> 
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
				</div>
            </div>

            <nav className={`${styles.navContianer} ${navIsOpen ? styles.showMeMobile : ''}`}>
                <div className="flex">
                <div className="col-1-60 relative">
                    <div className={styles.backgroundImage}></div>
                </div>
                <div className="col-1-40 height-100 relative">
                    <ul className={styles.mainNav}>
                    <li><Link href="/find-your-room/" passHref>
                        <a  onClick={(e) => handleClick(e, '/find-your-room/')}className="serif-light white">Find Your Room</a>
                    </Link></li>
                    <li><Link href="/amenities/">
                        <a  onClick={(e) => handleClick(e, '/amenities/')}className="serif-light white">Tasteful Touches</a>
                    </Link></li>
                    <li><Link href="/discoveries/">
                        <a  onClick={(e) => handleClick(e, '/discoveries/')}className="serif-light white">Discoveries</a>
                    </Link></li>
                    <li><Link href="/gatherings/">
                        <a  onClick={(e) => handleClick(e, '/gatherings/')}className="serif-light white">Gatherings</a>
                    </Link></li>
                    <li><Link href="/our-story/">
                        <a  onClick={(e) => handleClick(e, '/our-story/')}className="serif-light white">Our Story</a>
                    </Link></li>
                    <li><Link href="/journal/">
                        <a  onClick={(e) => handleClick(e, '/journal/')}className="serif-light white">The Journal</a>
                    </Link></li>
                    <li><Link href="/gallery/">
                        <a  onClick={(e) => handleClick(e, '/gallery/')}className="sans-serif-light white">Gallery</a>
                    </Link></li>
                    </ul>
                    <div className={styles.bottomnav}>
                    <div className="col-1-50">
                        <address className="sans-serif xs-copy white left">
                            Orli La Jolla<br/>555 Main Street,<br/>La Jolla<br/>California 12345
                         </address>
                         <p className="directions xs-copy white left">
                                <Link href="/">Get Directions</Link>
                                </p>
                    </div>
                    <div className="col-1-50">
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
                </div>
                </nav>
        </header>
        
    )
}