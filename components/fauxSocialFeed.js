import Image from "next/image";
import Link from "next/link";
import styles from "../styles/fauxSocialFeed.module.css";

export default function FauxSocialFeed(props) {
    let headline = props.headline || "Follow Along";
    let backgroundColor = props.backgroundColor || "Grey";
    let ctaLink = props.ctaLink || "https://www.instagram.com/stayorli";
    let ctaText = props.ctaText || "@StayOrli";
    let images = props.image || [
        {
            altText: "",
            mediaItemUrl:
                "https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_Post01.jpg",
        },
        {
            altText: "",
            mediaItemUrl:
                "https://orlidev.wpengine.com/wp-content/uploads/2022/07/ocean-view-3Edited2.jpg",
        },
        {
            altText: "",
            mediaItemUrl:
                "https://orlidev.wpengine.com/wp-content/uploads/2022/08/Orli_Recorder-scaled.jpg",
        },
        {
            altText: "Orli La Jolla California Cold Brew Bar",
            mediaItemUrl:
                "https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_Post10.jpg",
        },
    ];

    return (
        <section
            className={`${styles.fauxSocialFeedContainer} ${backgroundColor}-bg fauxsocial`}>
            <div className={`${styles.max80}`}>
                <div className={styles.topContainer}>
                    <h2 className="heading">{headline}</h2>
                    <Link href={ctaLink} passHref>
                        <a
                            className="sans-serif xs-copy underline"
                            target="_blank"
                            rel="noreferrer">
                            {ctaText}
                        </a>
                    </Link>
                </div>
                <div className={styles.grid}>
                    {images.map((image, index) => {
                        return (
                            <Link href={ctaLink} passHref key={`${index}-img`}>
                                <a target="_blank" aria-label="Orli Instagram">
                                    <Image
                                        key={`faux-${index}`}
                                        src={image.mediaItemUrl}
                                        width={348}
                                        height={348}
                                        layout="responsive"
                                        alt={image.altText}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
