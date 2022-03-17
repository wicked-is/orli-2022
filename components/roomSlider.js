import styles from '../styles/roomSlider.module.css'

export default function RoomSlider({ images }) {
    return (
        <section className={styles.roomSlider}>
            <a className={styles.cta} >Find Your Room</a>
            {/* map over images */}
            <div className={styles.roomSliderNavigation} >
                {/* map over navigation  */}
            </div>
        </section>
    )
}