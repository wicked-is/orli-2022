import Image from 'next/image';
import BlurbLeft from '../components/blurbLeft';
import styles from '../styles/twoStaggeredImages.module.css';

export default function DiscoveriesCallout(props) {
    /**
     * TODO: Update TwoStaggeredPhotos to take media/video from props
     */

    const { 
        blurb,
        ctaLink,
        ctaText,
        typeLeft,
        typeRight,
        imagePosterLeft,
        imagePosterRight,
        icon,
        mp4Left,
        webmLeft,
        mp4Right,
        webmRight,
        title
    } = props;

    return (
        <section className="bg-lt-grey" style={{ padding: '6rem 0 2rem' }}>
            <div className="max-80">
                <BlurbLeft
                    title={title}
                    content={blurb}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                    icon={icon}
                />
                <div className={styles.photoContainer}>
                    <div className={styles.left}>
                        {imagePosterLeft &&
                            <Image src={imagePosterLeft.mediaItemUrl} alt={imagePosterLeft.altText} width={561} height={370} layout="responsive" />
                        }
                        {mp4Left &&
                            <video className={styles.videoBG} autoPlay playsInline muted loop>
                                <source src={mp4Left} type="video/mp4" />
                                <source src={webmLeft} type="video/webm" />
                            </video>
                        }
                    </div>
                    <div className={styles.right}>
                        {imagePosterRight &&
                            <Image src={imagePosterRight.mediaItemUrl} alt={imagePosterRight.altText} width={708} height={434} layout="responsive" />
                        }
                        {mp4Right &&
                            <video className={styles.videoBG} autoPlay playsInline muted loop>
                                <source src={mp4Right} type="video/mp4" />
                                <source src={webmRight} type="video/webm" />
                            </video>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}