import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/fauxSocialFeed.module.css'

export default function FauxSocialFeed(props) {

    
    let headline = props.headline || 'Follow Along';
    let backgroundColor = props.backgroundColor || 'Grey';
    let ctaLink = props.ctaLink || 'https://www.instagram.com/stayorli';
    let ctaText = props.ctaText || '@StayOrli';
    let images = props.image || [
        {
            "altText": "",
            "mediaItemUrl": "https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_IG_01.jpg"
        },
        {
            "altText": "",
            "mediaItemUrl": "https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_IG_02.jpg"
        },
        {
            "altText": "",
            "mediaItemUrl": "https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_IG_04.jpg"
        },
        {
            "altText": "Orli La Jolla California Cold Brew Bar",
            "mediaItemUrl": "https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_drinkWeb.jpg"
        }
    ];

    return (
        <section className={`${styles.fauxSocialFeedContainer} ${backgroundColor}-bg`}>
            <div className={`${styles.max80}`}>
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
                                <Link href={ctaLink} passHref>
                                    <a target="_blank">           
                                        <Image key={`faux-${index}`} src={image.mediaItemUrl} width={348} height={348} layout="responsive" alt={image.altText} />
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}