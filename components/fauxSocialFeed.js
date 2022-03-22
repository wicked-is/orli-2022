import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/fauxSocialFeed.module.css'

export default function FauxSocialFeed() {
    return (
        <section className={styles.fauxSocialFeedContainer}>
            <div className="max-80">
                <div className={styles.topContainer}>
                    <h2 className="heading">Follow Along</h2>
                    <Link href="https://www.instagram.com/stayorli/" passHref>
                        <a target="_blank" rel="noreferrer">@stayorli</a>
                    </Link>
                </div>
                <div className={styles.grid}>
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" width={348} height={348} layout="responsive" alt="social image" />
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" width={348} height={348} layout="responsive" alt="social image" />
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" width={348} height={348} layout="responsive" alt="social image" />
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" width={348} height={348} layout="responsive" alt="social image" />
                </div>
            </div>
        </section>
    )
}