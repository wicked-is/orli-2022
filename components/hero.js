import BookingForm from './bookingForm';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/hero.module.css'
import { useEffect, useState } from 'react';

export default function Hero(props) {
    
    const {
        types,
        includeBookingForm,
        includeFeaturedRoomCta,
        featuredRoomCtaLink,
        featuredRoomCtaText,
        headline,
        blurb,
        imagePoster,
        mp4ExternalLink,
        webm,
        subnavigation
    } = props

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
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
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
                                includeFeaturedRoomCta && (
                                    <a style={{
                                        zIndex: 98,
                                        position: 'absolute',
                                        right: '3rem',
                                        top: '12rem'
                                    }} className="white xs-copy body-copy underline" href={featuredRoomCtaLink}>{featuredRoomCtaText}</a>
                                )
                            }
                        </div>
                    </div>
                )
            case 'Full Height Image with SubNav':
                    return (
                    <div className={styles.heroContainer}>
                        <div className={styles.bigheroSubnav}>
                            <ul className="subnavigationContainer">
                                
                                {
                                    subnavigation.map((item, index) => (
                                     
                                            <li key={`ni-${index}`} className={`${toggleActiveStyles(index)}`} onClick={() => {toggleActive(index);}}>
                                                <a href={item.link}>
                                                <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                                                <p className={`black nav-copy uppercase center sans-serif-bold`}>{item.label}</p>
                                                </a>
                                            </li>
                                    
                                    ))
                                }
                                
                            </ul>
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
                    </div>
                )
            case 'Small Hero Image':
                return (
                    <div className={styles.heroContainer}>
                        <div className={styles.smallHero}>
                            <img src={image.mediaUrl} alt={image.altText} />
                        </div>
                        {
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
                            )
                        } 
                    </div>
                )
            case 'Single Room':
                return (
                    <div className="smheroContainer">
                        <div className={styles.smallHero} style={{
                            backgroundImage: `url(${imagePoster.node.mediaItemUrl})`
                        }}>
                            <img src={imagePoster.node.mediaItemUrl} alt={imagePoster.node.altText} />
                        </div>
                        {
                            includeBookingForm && (
                                <section className={styles.horizontalFormContainer}>
                                    <BookingForm />
                                </section>
                            )
                        } 
                    </div>
                )
            case 'SubNav Only':
                return (
                    <div className={styles.bigheroSubnav}>
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