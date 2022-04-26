import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/fauxSocialFeed.module.css'

export default function FauxSocialFeed(props) {

    const { backgroundColor, ctaLink, ctaText, headline, image: images } = props;

    return (
        <section className={styles.fauxSocialFeedContainer}>
            <div className="max-80">
                <div className={styles.topContainer}>
                    <h2 className="heading">{headline}</h2>
                    <Link href={ctaLink} passHref>
                        <a className="sans-serif xs-copy underline" target="_blank" rel="noreferrer">{ctaText}</a>
                    </Link>
                </div>
                <div className={styles.grid}>
                    {
                        images.map((image, index) => {
                            return (
                                <Image key={`faux-${index}`} src={image.mediaItemUrl} width={348} height={348} layout="responsive" alt={image.altText} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}