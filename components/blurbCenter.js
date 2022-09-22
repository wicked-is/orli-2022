import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from '../styles/blurbCenter.module.css';
gsap.registerPlugin(ScrollTrigger);

export default function BlurbCenter(props) {
    useEffect(() => {
        var blurbcentersections = gsap.utils.toArray('.blurbcenterfade');

        blurbcentersections.forEach((blurbcentersection) => {
            gsap.to(blurbcentersection, { autoAlpha: 1,
                scrollTrigger: {
                    trigger: blurbcentersection,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse"
                }
            });
        });

    },[])

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
                <video poster={imagePoster.mediaItemUrl} autoPlay playsInline muted loop>
                    <source src={mp4ExternalLink} type="video/mp4" />
                    <source src={webm} type="video/webm" />
                </video>
            ) }
            <div className="max-60 center">
                { !mp4ExternalLink && <div className={`${styles.icon} blurbcenterfade`}>
                    <img src={icon?.mediaItemUrl} alt={icon?.altText}/>
                </div> }
                {headline && ( 
                    <p className="serif heading black center blurbcenterfade">{headline}</p>
                )}
                <p className="heading-italic blurbcenterfade">
                    { blurb }
                </p>
            </div>
        </section>
    )
}