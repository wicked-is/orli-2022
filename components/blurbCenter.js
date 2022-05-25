import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter(props) {

    const {
        blurb,
        greyBackground,
        hasBackgroundMedia,
        headline,
        icon,
        imagePoster,
        mp4ExternalLink,
        webm
    } = props

    console.log(props);

    return (
        <section className={`${styles.blurbContainer} ${greyBackground && 'bg-lt-grey'} ${hasBackgroundMedia && styles.backgroundMedia}`} style={{ backgroundImage: `${imagePoster}` }}>
            {
                hasBackgroundMedia && mp4ExternalLink && (
                    <video className={styles.backgroundMedia} autoPlay loop muted playsInline>
                        <source src={mp4ExternalLink} type="video/mp4" />
                        {webm && <source src={webm} type="video/webm" />}
                    </video>
                )
            }
            <div className={`max-75 center ${hasBackgroundMedia && styles.overContent} ${hasBackgroundMedia && 'white'}`}>
                { icon && <div className={`${styles.icon}`}>
                    <img src={icon.mediaItemUrl} alt={icon.altText}/>
                </div> }
                <p className="heading-italic white">
                    { blurb }
                </p>
            </div>
        </section>
    )
}