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
                <video poster={imagePoster.mediaItemUrl} autoPlay playsinline muted loop>
                    <source src={mp4ExternalLink} type="video/mp4" />
                    <source src={webm} type="video/webm" />
                </video>
            ) }
            <div className="max-60 center">
                { !mp4ExternalLink && <div className={`${styles.icon} fadein`}>
                    <img src={icon.mediaItemUrl} alt={icon.altText}/>
                </div> }
                <p className="heading-italic fadein">
                    { blurb }
                </p>
            </div>
        </section>
    )
}