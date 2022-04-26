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
        <section className={`${styles.blurbContainer} ${greyBackground && 'bg-lt-grey'}`}>
            <div className="max-75 center">
                <div className={`${styles.icon}`}>
                    <img src={icon.mediaItemUrl} alt={icon.altText}/>
                </div>
                <p className="heading-italic">
                    { blurb }
                </p>
            </div>
        </section>
    )
}