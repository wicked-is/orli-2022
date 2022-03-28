import BookingForm from './bookingForm';

import styles from '../styles/hero.module.css'
export default function Hero({ heroData, withBookingForm }) {

    const { caption, headline, heroTypes, image, mp4File, webmFile } = heroData

    const heroStructure = (heroTypes) => { 
        switch (heroTypes) {
            case 'Video':
                return (
                    <video className={styles.heroVideo} autoPlay playsInline muted loop poster="">
                        <source src={mp4File} type="video/mp4" />
                        <source src={webmFile} type="video/webm" />
                    </video>
                )
            case 'Full Height Image':
                return (
                    <div className={styles.bigHero}>
                         <img src={poster} alt={posteralt} />
                    </div>
                )
            case 'Small Hero Image':
                return (
                    <div className={styles.smallHero}>
                         <img src={poster} alt={posteralt} />
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <section className={styles.heroContainer}>
            { heroStructure(heroTypes) }
            {
                withBookingForm && (
                    <section className={styles.horizontalFormContainer}>
                        <BookingForm />
                    </section>
                )
            } 
        </section>
    )
}