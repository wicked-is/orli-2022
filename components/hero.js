import BookingForm from './bookingForm';

import styles from '../styles/hero.module.css'
export default function Hero({ imageonly, video, withBookingForm, poster, posteralt, webm, mp4 }) {
    return (
        <section className={styles.heroContainer}>
                    {imageonly  ? (
                        <div className="" style="">
                         <img src={poster} alt={posteralt} />
                        </div>): 
                (<video className={styles.heroVideo} autoPlay playsInline muted loop poster="">
                    <source src={mp4} type="video/mp4" />
                    <source src={webm} type="video/webm" />
                </video>)}
    
                {withBookingForm && (
                    <section className={styles.horizontalFormContainer}>
                        <BookingForm />
                    </section>
                )} 
        </section>
    )
}