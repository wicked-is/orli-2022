import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

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
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            width: '100%',
            backgroundColor: '#fff'
        }}>
            
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
            <div className="site-branding">
                <div className="announcement-bar">
                    <p className="sans-serif white xs-copy center">Lorem Ipsum Sed Ud Et Lorem</p>
                </div>
                
                <Link href="/">
                    <img
                        src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
                        alt="Orli La Jolla Logo"
                        className="header-logo"
                        width={380}
                        height={95} />
                </Link>

                <Link href="/">
                    <div className="primary-button">
                        <p className="sans-serif xs-copy white center uppercase">Find Your Room</p>
                    </div>
                </Link>

                <nav className="mobilelNav">
                    <Link href="/find-your-room/" passHref>
                        <a  onClick={(e) => handleClick(e, '/find-your-room/')}className="serif-light white">Find Your Room</a>
                    </Link>
                    <Link href="/amenities/">
                        <a  onClick={(e) => handleClick(e, '/amenities/')}className="serif-light white">Tasteful Touches</a>
                    </Link>
                    <Link href="/discoveries/">
                        <a  onClick={(e) => handleClick(e, '/discoveries/')}className="serif-light white">Discoveries</a>
                    </Link>
                    <Link href="/gatherings/">
                        <a  onClick={(e) => handleClick(e, '/gatherings/')}className="serif-light white">Gatherings</a>
                    </Link>
                    <Link href="/our-story/">
                        <a  onClick={(e) => handleClick(e, '/our-story/')}className="serif-light white">Our Story</a>
                    </Link>
                    <Link href="/journal/">
                        <a  onClick={(e) => handleClick(e, '/journal/')}className="serif-light white">The Journal</a>
                    </Link>
                    <Link href="/gallery/">
                        <a  onClick={(e) => handleClick(e, '/gallery/')}className="sans-serif-light green">Gallery</a>
                    </Link>
                </nav>

                <div className="hamburger hamburger--collapse" type="button" onClick={() => toggleNav()}> 
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</div>
                
            </div>
        </header>
        
    )
}