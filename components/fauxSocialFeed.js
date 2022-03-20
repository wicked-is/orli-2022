import styles from '../styles/fauxSocialFeed.module.css'

export default function FauxSocialFeed() {
    return (
        <section className={styles.fauxSocialFeedContainer}>
            <h2>Follow Along</h2>
            <a href="/">@stayorli</a>
            <div>
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
            </div>
        </section>
    )
}