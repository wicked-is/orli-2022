import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import styles from '../styles/header.module.css';
import Script from 'next/script';
import Analytics from './Analytics'
import WeatherWidget from './WeatherWidget';

import Favicon from '../public/favicon.ico'

export default function Header(props) {
    
    const navItems = props.navItems
    const topBar = props?.topBar

    const [navIsOpen, setNavIsOpen] = useState(false);
    const [navImage, setNavImage] = useState('https://orlistg.wpengine.com/wp-content/uploads/2022/09/Orli_Menu_Our-StoryWeb.jpg');
    const [announcementbarIsOpen, setAnnouncementbarIsOpen] = useState(false);

    useEffect(() => { 
        setNavImage(navImage);
    }, [navImage]);

    useEffect(() => { 
        if (topBar) {
            setAnnouncementbarIsOpen(topBar.isAnnouncementBarActive)
        }
    }, [topBar]);

    function toggleNav() {
        setNavIsOpen(!navIsOpen)
    }

    function handleClick(e, path) {
        e.preventDefault();
        window.location = path;
    }

    function closeAnnouncementBar() {
        setAnnouncementbarIsOpen(false);
    }

    return (
        <header className={`${styles.header} ${navIsOpen ? styles.open : ''}`}>
            
            <Analytics/>
            {/* <Script
                src="https://www.bugherd.com/sidebarv2.js?apikey=dw2fpdf4dfctxv0wzdcnuw"
                strategy="beforeInteractive"
            /> */}
            <Head>
                {/* Head elements required on every page */}
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                {/* <link rel="icon" href="https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_Favicon.jpg" /> */}
                <link rel="icon" href={Favicon.src} />
            </Head>
            {
                announcementbarIsOpen && (
                    <div className={styles.announcementbar} style={{
                        display: announcementbarIsOpen ? 'flex' : 'none'
                    }}>
                        <p className="sans-serif white xs-copy center">{topBar.announcementBarText}</p>
                        <button style={{
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1rem'
                        }}
                            onClick={closeAnnouncementBar}
                        >&#10005;</button>
                    </div>
                )
            }
            <div className={styles.sitebranding}>
                    {
                        navIsOpen ? (
                            <Link href="/"><div className="openclick" onClick={() => toggleNav()}>
                                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="Orli La Jolla Logo" className={styles.headerlogo} width={380} height={95} />
                            </div></Link>
                        ) : (
                            <Link href="/">
                                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="Orli La Jolla Logo" className={styles.headerlogo} width={380} height={95} />
                            </Link>
                        )
                    }

                <div className={styles.telephoneContainer}>
                    <Link href="tel:+16195760806">
                        <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/09/phone-solid.svg" alt="telephone link" />
                    </Link>
                </div>

                <Link href="/find-your-room">
                    <div className={styles.primarybutton}>
                        <p className="sans-serif xs-copy white center uppercase mobilehideme">Find Your Room</p>
                        <p className="sans-serif xs-copy white center uppercase mobileshowme">Rooms</p>
                    </div>
                </Link>

            <div className={styles.hamburgerContainer}>
                <div className="hamburger hamburger--collapse" type="button" onClick={() => toggleNav()}> 
                    {
                        navIsOpen ? (
                            <img className={styles.close} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/white-copy.svg" alt="close icon" />
                        ) : (
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        )
                    }
                    <div className={styles.hamburgermenu}>Menu</div>
				</div>
                </div>
            </div>

            <nav className={`${styles.navContianer} ${navIsOpen ? styles.showMeMobile : ''}`}>
                <div className="flex">
                    <div className={`${styles.col160} relative`}>
                        <div className={styles.backgroundImage} style={{ background: `url(${navImage})`}}></div>
                    </div>
                    <div className={`${styles.col140} relative flex flex-column justify-content-space-between`}>
                        <WeatherWidget />
                        <ul className={styles.mainNav}>
                            {
                                navItems.map((item, index) => { 
                                    return (
                                        <li key={`ni-${index}`} onMouseEnter={() => setNavImage(item.image.mediaItemUrl)}>
                                            <Link href={item.link} passHref>
                                                <a
                                                    data-navimage={item.image.mediaItemUrl} data-alttext={item.image.altText}
                                                    onClick={(e) => handleClick(e, item.link)} className="serif-light white">
                                                    {item.label}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className={styles.bottomnav}>
                            <div className="col-1-50">
                                <address className="sans-serif xs-copy white left" style={{ marginTop: '.88rem' }}>
                                    Orli La Jolla<br/>7753 Draper Ave,<br/>La Jolla, CA 92037
                                </address>
                                <p className="directions xs-copy white left">
                                    <Link target="_blank" href="https://goo.gl/maps/MvajX29ZNg3kz5M69" rel="noreferrer">Get Directions</Link>
                                </p>
                            </div>
                            <div className="col-1-50">
                                <p className="sans-serif xs-copy white left">
                                    T: <a href="tel:6195760806">619.576.0806</a><br/>
                                    E: <a href="mailto:hello@stayorli.com">hello@stayorli.com</a><br/>
                                </p>
                                <p className={`${styles.contact} sans-serif xs-copy white left`}>
                                <Link href="/contact" onClick={(e) => handleClick(e)}><span onClick={() => toggleNav()}>Contact</span></Link>
                                </p>
                                <ul className={styles.socials}>
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
                                        <Link href="/" passHref>
                                            <Image
                                               src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                               alt="facebook Logo"
                                               className="facebook"
                                               width={14}
                                               height={30} />
                                        </Link>
                                        </li>
                                    */}
                                    <li>
                                        <a href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=6d7e7bfb014b433d" target="_blank" rel="noopener noreferrer">
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
                </div>
            </nav>
        </header>
        
    )
}