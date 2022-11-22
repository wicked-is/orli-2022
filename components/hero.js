import BookingForm from './bookingForm';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/hero.module.css'
import { useEffect, useState } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import RoomGallerySlider from './RoomGallerySlider';
gsap.registerPlugin(ScrollTrigger);

export default function Hero(props) {
    const {
        types,
        includeBookingForm,
        gallery,
        includeLogo,
        pressLink,
        pressLogo,
        includeRoomGallery,
        includeBookMultipleRoomsLink,
        includeFeaturedRoomCta,
        featuredRoomCtaLink,
        featuredRoomCtaText,
        headline,
        blurb,
        datePublished,
        imagePoster,
        mp4ExternalLink,
        webm,
        subnavigation
    } = props

    const [dimensions, setDimensions] = useState({ 
        height: null,
        width: null
    })
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

            if (window.innerWidth < 820) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const [appState, changeState] = useState({
        activeObject: null,
        objects: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}]
    });

    function toggleActive(index){
        changeState({...appState, activeObject: appState.objects[index] });
    }

    function toggleActiveStyles(index){
        if(appState.objects[index] === appState.activeObject){
            return "active";
        } else {
            return "inactive";
        }
    }

    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

    const toggleGallery = (e) => {
        e.preventDefault();
        setIsGalleryVisible(!isGalleryVisible);
    }

    useEffect(() => {
        var icons = gsap.utils.toArray('.iconnav');
        var arrows = gsap.utils.toArray('.arrowssub');

        if (icons) {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    autoAlpha: 1,
                    scrollTrigger: {
                        trigger: icon,
                        start: "top top",
                        endTrigger: "main",
                        end: "bottom top",
                        toggleClass: 'hide'
                    }
                })
            });
        }

        if (arrows) {
            icons.forEach((arrow) => {
                gsap.to(arrow, {
                    scrollTrigger: {
                        trigger: arrows,
                        start: "top top",
                        endTrigger: "main",
                        end: "bottom top",
                        toggleClass: 'height'
                    }
                })
            });
        }

    },[])

    const heroStructure = (types) => {
        switch (types) {
            case 'Video':
                return (
                    <div className={styles.heroContainer}>
                        <div className={styles.herotextOver}>
                            <p className="sans-serif sub-heading-bold white">{headline}</p>
                            <p className="serif heading white" dangerouslySetInnerHTML={{ __html: blurb}}></p>
                        </div>
                        <video className={styles.heroVideo} autoPlay playsInline muted loop poster="">
                            <source src={mp4ExternalLink} type="video/mp4" />
                            <source src={webm} type="video/webm" />
                        </video>
                        {
                            includeLogo && (
                                <div className={styles.mobileherologo}>
                                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" alt="Orli La Jolla Logo" />
                                </div>
                            )
                        }
                        {
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
                            )
                        }
                        {
                            includeBookMultipleRoomsLink && (
                                <div className={styles.bookmultipleroomsContainer}>
                                    <Link href="/book-a-room/" passHref>
                                        <a className={`${styles.bookingtext} sans-serif xs-copy underline white`}>
                                            Book Multiple Rooms
                                        </a>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            includeFeaturedRoomCta && (
                                <a href={featuredRoomCtaLink}>{featuredRoomCtaText}</a>
                            )
                        }    
                    </div>
                )
            case 'Full Height Image':
                return (
                    <div className={styles.heroContainer}>
                        <div className={styles.bigHero} style={{
                            backgroundImage: `url(${imagePoster.mediaItemUrl})`
                        }}>
                            <div className={styles.herotextOver}>
                            <p className="sans-serif sub-heading-bold white">{headline}</p>
                            <p className="serif heading white" dangerouslySetInnerHTML={{ __html: blurb}}></p>
                            </div>
                            {
                                includeBookingForm && (
                                    <section className={styles.horizontalFormContainer}>
                                        <BookingForm />
                                    </section>
                                )
                            }
                            { 
                                includeBookMultipleRoomsLink && (
                                    <div className={styles.bookmultipleroomsContainer}>
                                        <Link href="/book-a-room/" passHref>
                                            <a className={`${styles.bookingtext} sans-serif xs-copy underline white`}>
                                                Book Multiple Rooms
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }
                            {
                                includeFeaturedRoomCta && (
                                    <a style={{
                                        zIndex: 98,
                                        position: 'absolute',
                                        right: '3rem',
                                        top: '9rem'
                                    }} className="white xs-copy body-copy underline textshadow" href={featuredRoomCtaLink}>{featuredRoomCtaText}</a>
                                )
                            }
                        </div>
                    </div>
                )
            case 'Full Height Image with Booking Bar and Heading':
                return (
                    <div className={styles.heroContainer}>
                        <div className={styles.bigHero} style={{
                            backgroundImage: `url(${imagePoster.mediaItemUrl})`
                        }}>
                            <div className={styles.herotextOverBooking}>
                            <p className="sans-serif sub-heading-bold white left">{headline}</p>
                            <p className="serif heading white left" dangerouslySetInnerHTML={{ __html: blurb}}></p>
                            </div>
                            {
                                includeBookingForm && (
                                    <section className={styles.horizontalFormContainer}>
                                        <BookingForm />
                                    </section>
                                )
                            }
                            {
                                includeBookMultipleRoomsLink && (
                                    <div className={styles.bookmultipleroomsContainer}>
                                        <Link href="/book-a-room/" passHref>
                                            <a className={`${styles.bookingtext} sans-serif xs-copy underline white`}>
                                                Book Multiple Rooms
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }
                            {
                                includeFeaturedRoomCta && (
                                    <a className={`${styles.ftroomcta} white xs-copy body-copy underline dropshadow`} href={featuredRoomCtaLink}>{featuredRoomCtaText}</a>
                                )
                            }
                        </div>
                    </div>
            )
            case 'Full Height Image with SubNav':
                    return (
                    <div className={styles.heroContainer}>
                        <div className={`${styles.bigheroSubnav}`}>
                            <ul className="subnavigationContainer" style={{ display: isMobile ? 'none' : 'flex' }}>
                                
                                {
                                    subnavigation.map((item, index) => (
                                     
                                            <li key={`ni-${index}`} className={`${toggleActiveStyles(index)}`} onClick={() => {toggleActive(index);}}>
                                                <a href={item.link}>
                                                <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className="iconnav" style={{ marginBottom: '1rem' }} alt={item.iconnav?.altText} />
                                                <p className={`black nav-copy uppercase center sans-serif-bold mt-0`}>{item.label}</p>
                                                </a>
                                            </li>
                                    
                                    ))
                                }
                                
                            </ul>
                            <div className="arrowssub" style={{ display: isMobile ? 'none' : 'initial' }}></div>
                        <div className={styles.bigHero} style={{
                            backgroundImage: `url(${imagePoster.mediaItemUrl})`
                        }}>
                            <div className={styles.herotextOver}>
                            <p className="sans-serif sub-heading-bold white">{headline}</p>
                            <p className="serif heading white">{blurb}</p>
                            </div>
                        </div>
                        </div>
                        {
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
                            )
                        }
                        { 
                            includeBookMultipleRoomsLink && (
                            <div className={styles.bookmultipleroomsContainer}>
                                <Link href="/book-a-room/" passHref>
                                    <a className={`${styles.bookingtext} sans-serif xs-copy underline white`}>
                                        Book Multiple Rooms
                                    </a>
                                </Link>
                            </div>
                            )
                        }
                    </div>
                )
            case 'Small Image':
                return (
                        <div className={styles.smallHeroImage} style={{backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                            <div className={styles.textOver}>
                                {headline && (<p className="sans-serif sub-heading-bold white">{headline}</p>)}
                                {blurb && (<h1 className="serif heading white">{blurb}</h1>)}
                            </div>
                        </div>
                )
            case 'Single Room':
                return (
                    <div className="smheroContainer room">
                        <div className={`${styles.smallHero} roomind force`} style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.35)), url(${imagePoster.mediaItemUrl})`
                        }} onClick={toggleGallery}>
                            <img src={imagePoster.mediaItemUrl} alt={imagePoster.altText} className="posterinmg"/>
                        </div>
                        {
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
                            )
                        }
                        {
                            gallery && (
                                <>
                                    <Link href="/">
                                        <a className={`${styles.viewGallery} sans-serif white body-copy textshadow underline`}
                                        onClick={toggleGallery}
                                        >
                                            View Gallery
                                        </a>
                                    </Link>
                                    { isGalleryVisible && <RoomGallerySlider gallery={gallery} toggleGallery={toggleGallery} /> }
                                </>
                            )
                        } 
                    </div>
                )
            case 'Single Journal':
                return (
                    <div className="smheroContainer">
                        <div className={styles.smallJournalHero} style={{
                            backgroundImage: `url(${imagePoster.mediaItemUrl})`
                        }}>
                            <div className={styles.journalHeroText}>
                                <p className="xs-heading uppercase letterSpacing white">{props.categories.nodes[0].name}</p>
                                <p className="serif heading white">{props.postTitle}</p>
                                {datePublished && <p className="sans-serif body white">{datePublished}</p>}
                           </div>
                            <div className={styles.overlay}></div>
                        </div>
                    </div>
                )
            case 'SubNav Only':
                return (
                    <div className={styles.bigheroSubnav} style={{opacity: isMobile ? '0' : '1', height: isMobile ? '0' : 'initial' }}>
                    <ul className="subnavigationonlyContainer">
                                {
                                    // This was the incorrect bit. You were calling parameters
                                    // on the item without having the item defined. 
                                    // When you're back we can huddle if you'd like.
                                    subnavigation.map((item, index) => {
                            return (
                                <li key={`ni-${index}`} >
                                    <a href={item.link}>
                                    <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                                    <p className="sans-serif nav-copy uppercase black center">{item.label}</p>
                                    </a>
                                </li>
                                )
                        })
                    }
                            </ul>
                            <div className="arrowssub"></div>
                    </div>
                )
            case 'Single Press':
                return (
                    <div className="smheroContainer">
                            <div className={styles.smallPressHero} style={{backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                                <div className={styles.logoOver}>
                                    <Image src={pressLogo.mediaItemUrl} alt={pressLogo.altText} width={721} height={135} layout="intrinsic"/>
                                </div>
                                <div className={styles.textOver}>
                                <p className="xs-heading uppercase letterSpacing white" style={{ zIndex: 1}}>The Latest</p>
                                <p className="serif heading white left">
                                    <a target="_blank" href={pressLink} rel="noreferrer noopener">{headline}</a>
                                </p>
                                <p className="sans-serif white left xs-copy underline">
                                    <a target="_blank" href={pressLink} rel="noreferrer noopener">Read More</a>
                                </p>
                                </div>
                                <div className={styles.overlay}></div>
                            </div>
                    </div>
            )
            default:
                return null;
        }
    }

    return (
        <section>
            { heroStructure(types) }
        </section>
    )
}