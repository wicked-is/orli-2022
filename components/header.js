import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import styles from '../styles/header.module.css';
import Script from 'next/script';
import Analytics from './Analytics'

export default function Header(props) {
    
    const navItems = props.navItems
    const topBar = props.topBar

    const [navIsOpen, setNavIsOpen] = useState(false);
    const [navImage, setNavImage] = useState(null);

    useEffect(() => { 
        setNavImage(navItems[0].image.mediaItemUrl);
    }, [navImage]);

    function toggleNav() {
        setNavIsOpen(!navIsOpen)
    }

    function handleClick(e, path) {
        e.preventDefault();
        window.location = path;
    }

    return (
        <header className={`${styles.header} ${navIsOpen ? styles.open : ''}`}>
            
            <Analytics siteNotLive/>
            <Script
                src="https://www.bugherd.com/sidebarv2.js?apikey=dw2fpdf4dfctxv0wzdcnuw"
                strategy='afterInteractive'
            />
            <Head>
                {/* Head elements required on every page */}
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                topBar?.isAnnouncementBarActive && (
                    <div className={styles.announcementbar}>
                        <p className="sans-serif white xs-copy center">{topBar.announcementBarText}</p>
                    </div>
                )
            }
            <div className={styles.sitebranding}>
                <Link href="/">
                    <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="Orli La Jolla Logo" className={styles.headerlogo} width={380} height={95} />
                </Link>

                <Link href="/">
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
                        <div className={styles.backgroundImage} style={{ backgroundImage: `url(${navImage})` }}></div>
                    </div>
                    <div className={`${styles.col140} relative flex flex-column justify-content-space-between`}>
                        <ul className={styles.mainNav}>
                            {
                                navItems.map((item, index) => { 
                                    return (
                                        <li onMouseEnter={() => setNavImage(item.image.mediaItemUrl)} key={`ni-${index}`}>
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
                                        <Link href="/" passHref>
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