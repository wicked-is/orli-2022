import BookingForm from './bookingForm';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/hero.module.css'

export default function Hero(props) {
    
    const {
        types,
        includeBookingForm,
        headline,
        blurb,
        imagePoster,
        mp4ExternalLink,
        webm,
        subnavigation
    } = props

    const heroStructure = (types) => { 
        switch (types) {
            case 'Video':
                return (
                <div className={styles.heroContainer}>
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
                        <p className="serif heading white">{blurb}</p>
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
            case 'Full Height Image with SubNav':
                    return (
                    <div className={styles.heroContainer}>
                        <div className={styles.bigheroSubnav}>
                            <ul className={styles.subnavigationContainer}>
                           
                                {
                                    // This was the incorrect bit. You were calling parameters
                                    // on the item without having the item defined. 
                                    // When you're back we can huddle if you'd like.
                                    subnavigation.map((item, index) => {
                            return (
                                <li key={`ni-${index}`} >
                                    <a href={item.link}>
                                    <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                                    <p className="black xs-copy uppercase center">{item.label}</p>
                                    </a>
                                </li>
                                )
                        })
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
            case 'SubNav Only':
                return (
                    <div className={styles.bigheroSubnav}>
                    <ul className={styles.subnavigationonlyContainer}>
                                {
                                    // This was the incorrect bit. You were calling parameters
                                    // on the item without having the item defined. 
                                    // When you're back we can huddle if you'd like.
                                    subnavigation.map((item, index) => {
                            return (
                                <li key={`ni-${index}`} >
                                    <a href={item.link}>
                                    <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                                    <p className="black xs-copy uppercase center">{item.label}</p>
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