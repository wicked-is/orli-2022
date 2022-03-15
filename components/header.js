import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from '../styles/header.module.css'

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
            <div className="container">
                <Link href="/">
                    <Image
                        src=""
                        alt="Orli La Jolla Logo"
                        className="logo"
                        width={380}
                        height={95} />
                </Link>
                <nav className={`${styles.mainNav} ${navIsOpen ? styles.showMeMobile : ''}`}>
                    <button onClick={() => toggleNav()}>&#10005;</button>
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
                <div className={styles.menuBurger}>
                    <button onClick={() => toggleNav()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
        
    )
}