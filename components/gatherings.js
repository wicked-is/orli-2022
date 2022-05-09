import Image from 'next/image';
import ThreePartHeading from './threePartHeading';
import EventFeed from './eventFeed';

import styles from '../styles/gatherings.module.css';

export default function Gatherings(props) {

    const { type, subHeadline, headline, blurb, ctaText, ctaLink, media, events, anchorTag } = props
    
    const gatheringStructure = (type) => { 
    switch (type) {
        case 'Gatherings':
    return (
        <>
            <div className={styles.left}>
                <ThreePartHeading
                    subheader={subHeadline}
                    header={headline}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                />
                {
                    media[0].type === "Video" && (
                        <div className={`${styles.videoBackground}`}>
                            <div>
                                <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={media[0].mp4} type="video/mp4" />
                                    <source src={media[0].webm} />
                                </video>
                            </div>
                            <p className="serif xs-copy uppercase brown"><a href={media[0].ctaLink}>{media[0].ctaText}</a></p>
                        </div>
                    )
                }
            </div>
            <div className={styles.right}>
                {
                    media[1].type === "Image" && (
                        <>
                            <Image src={media[1].imagePoster.sourceUrl} alt={media[1].imagePoster.altText} width={561} height={370} layout="responsive" />
                            <p className="serif xs-copy uppercase brown"><a href={media[1].ctaLink}>{media[1].ctaText}</a></p>
                        </>
                    )
                }
                { type === "Weddings" ? (
                        <p className="sans-serif body-copy black left" style={{ paddingTop: '5rem' }}>{blurb}</p>
                    ) : (
                        <EventFeed events={events} />
                    )
                }
            </div>
        </>
    )
    case 'Weddings':
        return (
            <>
            <div className={styles.left}>
                <ThreePartHeading
                    subheader={subHeadline}
                    header={headline}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                />
                {
                    media[0].type === "Video" && (
                        <div className={`${styles.videoBackground}`}>
                            <div>
                                <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={media[0].mp4} type="video/mp4" />
                                    <source src={media[0].webm} />
                                </video>
                            </div>
                        </div>
                    )
                }
                {
                    media[0].type === "Image" && (
                        <>
                            <Image src={media[0].imagePoster.sourceUrl} alt={media[0].imagePoster.altText} width={561} height={593} layout="responsive" />
                        </>
                    )
                }
            </div>
            <div className={styles.right}>
                {
                    media[1].type === "Image" && (
                        <>
                            <Image src={media[1].imagePoster.sourceUrl} alt={media[1].imagePoster.altText} width={561} height={370} layout="responsive" />
                        </>
                    )
                }
                <p className={`${styles.blurbpadding} sans-serif body-copy black left`}>{blurb}</p>
            </div>
            </>
        )
    }
    }
    return (
        <section className={`${styles.gatheringsContainer} max-80`}>
            { anchorTag && (
                       <a id={anchorTag} name={anchorTag} className="anchor"></a>
            )}
            { gatheringStructure(type) }
        </section>
    )
}