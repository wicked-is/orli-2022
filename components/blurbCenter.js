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

    return (
        <section className={`${styles.blurbContainer} ${greyBackground && 'bg-lt-grey'} ${mp4ExternalLink ? 'has-video' : ''}`}>
            {mp4ExternalLink && (
                <video poster={imagePoster.mediaItemUrl} autoplay="true" playsinline muted loop>
                    <source src={mp4ExternalLink} type="video/mp4" />
                    <source src={webm} type="video/webm" />
                </video>
            ) }
            <div className="max-75 center">
                { !mp4ExternalLink && <div className={`${styles.icon}`}>
                    <img src={icon.mediaItemUrl} alt={icon.altText}/>
                </div> }
                <p className="heading-italic">
                    { blurb }
                </p>
            </div>
        </section>
    )
}