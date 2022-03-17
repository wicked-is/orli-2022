import BookingForm from './bookingForm';

import styles from '../styles/hero.module.css'
export default function Hero({ poster, video, withBookingForm }) {
    return (
        <section className={styles.heroContainer}>
            <video className={styles.heroVideo} autoplay playsinline muted loop>
                <source src="https://stayorli.com/wp-content/uploads/2022/02/orlihero5-1.mp4" type="video/mp4" />
                <source src="https://stayorli.com/wp-content/uploads/2022/02/orlihero5-1.webm" type="video/webm" />
            </video>
            {withBookingForm && (
                <BookingForm />
            )}
        </section>
    )
}