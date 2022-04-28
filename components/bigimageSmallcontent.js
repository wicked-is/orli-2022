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
           {contentPosition === "Left" && (
               <div className="col-flex">
                <div className="col-1-40">
                    { icon && (<Image src={icon?.mediaItemUrl} alt={icon?.altText} width={312} height={302} layout="responsive"/>)}
                    <p className="sans-serif black left">{subHeadline}</p>
                    <p className="serif black left">{headline}</p>
                    <p className="sans-serif black left">{blurb}</p>
                </div>
                <div className="col-1-60">
                {
                    mediaType === "Image" && (
                        <>
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </>
                    )
                }
                {
                    mediaType === "Slider" && (
                        <>
                            
                        </>
                    )
                }
                {
                    mediaType === "Video" && (
                        <div className={`${styles.videoBackground}`}>
                            <div>
                                <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={mp4OrExternalLink} type="video/mp4" />
                                    <source src={webm} type="video/webm"/>
                                </video>
                            </div>
                            <p className="serif xs-copy uppercase brown"><a href={ctaLink}>{ctaText}</a></p>
                        </div>
                    )
                }
                </div>
               </div>
           )
           }
           {contentPosition === "Right" && (
               <div className="col-flex">
                <div className="col-1-60">
                {
                    mediaType === "Image" && (
                        <>
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </>
                    )
                }
                {
                    mediaType === "Slider" && (
                        <>
                            
                        </>
                    )
                }
                {
                    mediaType === "Video" && (
                        <div className={`${styles.videoBackground}`}>
                            <div>
                                <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={mp4OrExternalLink} type="video/mp4" />
                                    <source src={webm} type="video/webm" />
                                </video>
                            </div>
                            <p className="serif xs-copy uppercase brown"><a href={ctaLink}>{ctaText}</a></p>
                        </div>
                    )
                }
                </div>
                <div className="col-1-40">
                { icon && (<Image src={icon?.mediaItemUrl} alt={icon?.altText} width={312} height={302} layout="responsive"/>)}
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