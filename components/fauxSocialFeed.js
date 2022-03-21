import Link from 'next/link'
import styles from '../styles/fauxSocialFeed.module.css'

export default function FauxSocialFeed() {
    return (
        <section className={styles.fauxSocialFeedContainer}>
            <h2>Follow Along</h2>
            <Link href="/">
                <a>@stayorli</a>
            </Link>
            <div>
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
            </div>
        </section>
    )
}