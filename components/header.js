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
    const topBar = props.topBar

    const [navIsOpen, setNavIsOpen] = useState(false);
    const [navImage, setNavImage] = useState('https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_OurStory2Web.jpg');
    const [announcementbarIsOpen, setAnnouncementbarIsOpen] = useState(false);

    useEffect(() => { 
        setNavImage(navImage);
    }, [navImage]);

    useEffect(() => { 
        setAnnouncementbarIsOpen(topBar?.isAnnouncementBarActive)
    }, []);

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

    console.log(Favicon.src);

    return (
        <header className={`${styles.header} ${navIsOpen ? styles.open : ''}`}>
            
            <Analytics siteNotLive/>
            <Script
                src="https://www.bugherd.com/sidebarv2.js?apikey=dw2fpdf4dfctxv0wzdcnuw"
                strategy="beforeInteractive"
            />
            <Head>
                {/* Head elements required on every page */}
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                {/* <link rel="icon" href="https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_Favicon.jpg" /> */}
                <link rel="icon" href={Favicon.src} />
            </Head>
            {
                topBar?.isAnnouncementBarActive && (
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
                <Link href="/">
                    <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="Orli La Jolla Logo" className={styles.headerlogo} width={380} height={95} />
                </Link>

                <Link href="/find-your-room">
                    <div className={styles.primarybutton}>
                        <p className="sans-serif xs-copy white center uppercase">Find Your Room</p>
                    </div>
                </Link>

                <div className="hamburger hamburger--collapse" type="button" onClick={() => toggleNav()}> 
                    {
                        navIsOpen ? (
                            <img className={styles.close} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/white-copy.svg" alt="close icon" onClick={() => toggleNav()} />
                        ) : (
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        )
                    }
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
                                    <Link target="_blank" href="https://www.google.com/search?q=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&rlz=1C5CHFA_enUS963US963&oq=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&aqs=chrome..69i57j0i512j69i60l3.816j0j4&sourceid=chrome&ie=UTF-8#">Get Directions</Link>
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
                            <div className="col-1-50">
                                <p className="sans-serif xs-copy white left">T: 123 555 5555<br/>
                                E: email@stayorli.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        
    )
}