import Image from 'next/image';

import styles from '../styles/bigimagesmallcontent.module.css';

export default function BigImageSmallContent(props) {

    const {
        contentPosition, 
        subHeadline, 
        headline, 
        blurb, 
        icon, 
        media, 
        imagePoster, 
        mediaFullWidth,
        mediaType,
        mp4OrExternalLink,
        webm,
        slides } = props
    
    return (
        <section className={`${styles.container} max-80`}>
           {contentPosition[0].type === "Left" && (
               <div className="col-flex">
                <div className="col-1-40">
                    <Image src={icon} />
                    <p className="sans-serif black left">{subHeadline}</p>
                    <p className="serif black left">{headline}</p>
                    <p className="sans-serif black left">{blurb}</p>
                </div>
                <div className="col-1-60">
                {
                    media[0].type === "Image" && (
                        <>
                            <Image src={media[1].imagePoster.sourceUrl} alt={media[1].imagePoster.altText} width={561} height={370} layout="responsive" />
                        </>
                    )
                }
                {
                    media[1].type === "Slider" && (
                        <>
                            
                        </>
                    )
                }
                {
                    media[3].type === "Video" && (
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
               </div>
           )
           }
           {contentPosition[1].type === "Right" && (
               <div className="col-flex">
                <div className="col-1-60">
                {
                    media[0].type === "Image" && (
                        <>
                            <Image src={media[1].imagePoster.sourceUrl} alt={media[1].imagePoster.altText} width={561} height={370} layout="responsive" />
                        </>
                    )
                }
                {
                    media[1].type === "Slider" && (
                        <>
                            
                        </>
                    )
                }
                {
                    media[3].type === "Video" && (
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
                <div className="col-1-40">
                    <p className="sans-serif black left">{subHeadline}</p>
                    <p className="serif black left">{headline}</p>
                    <p className="sans-serif black left">{blurb}</p>
                </div>
               </div>
           )
           }
        </section>
    )
}