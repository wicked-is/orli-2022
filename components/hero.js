import BookingForm from './bookingForm';

import styles from '../styles/hero.module.css'

export default function Hero(props) {
    
    const {
        types,
        includeBookingForm,
        headline,
        blurb,
        image,
        mp4ExternalLink,
        webm
    } = props

    const heroStructure = (types) => { 
        switch (types) {
            case 'Video':
                return (
                    <video className={styles.heroVideo} autoPlay playsInline muted loop poster="">
                        <source src={mp4ExternalLink} type="video/mp4" />
                        <source src={webm} type="video/webm" />
                    </video>
                )
            case 'Full Height Image':
                return (
                    <div className={styles.bigHero}>
                         <img src={image.mediaUrl} alt={image.altText} />
                    </div>
                )
            case 'Small Hero Image':
                return (
                    <div className={styles.smallHero}>
                         <img src={image.mediaUrl} alt={image.altText} />
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <section className={styles.heroContainer}>
            { heroStructure(types) }
            {
                includeBookingForm && (
                    <section className={styles.horizontalFormContainer}>
                        <BookingForm />
                    </section>
                )
            } 
        </section>
    )
}