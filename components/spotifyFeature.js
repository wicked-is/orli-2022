import Link from 'next/link'
import styles from '../styles/spotifyFeature.module.css'

export default function SpotifyFeature() {
    return (
        <section className={styles.spotifyFeature}>
            <video className={styles.videoBG} autoPlay playsInline muted loop>
                <source src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/pexels-pavel-danilyuk-7318864.mp4" type="video/mp4" />
                <source src="https://orlidev.wpengine.com/wp-content/uploads/2022/02/orlihero3-1.webm" type="video/webm" />
            </video>
            <div className={`${styles.container} max-70`}>
                <div>
                    <p className="heading white">Were Friends, and Friends Share Music</p>
                    <Link href="/">
                        <a className="xs-copy white" style={{ textDecoration: "underline" }}>Listen on Spotify</a>
                    </Link>
                </div>
                <div className={styles.spotifyEmbed}>
                    {/* Playlist Goes Here */}
                </div>
            </div>
        </section>
    )
}