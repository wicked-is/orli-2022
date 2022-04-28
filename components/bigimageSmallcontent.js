import Image from 'next/image';

import styles from '../styles/bigimagesmallcontent.module.css';

export default function BigImageSmallContent(props) {

    const {
        contentPosition, 
        subHeadline, 
        headline, 
        blurb,
        ctaLink,
        ctaText,
        icon, 
        media, 
        imagePoster,
        paddingType,
        mediaFullWidth,
        mediaType,
        mp4OrExternalLink,
        webm,
        slides } = props
    
    return (
        <section className={styles.container}>
           {contentPosition === "Left" && (
               <div className="max-80">
               <div className={`flex ${paddingType}`}>
                <div className="col-1-40 text-padding-right">
                    { icon && (
                        <p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.leftIcon}/></p>
                        )
                    }
                    <p className="sans-serif sub-heading-bold black left">{subHeadline}</p>
                    <p className="serif heading black left">{headline}</p>
                    <p className="sans-serif body-copy black left">{blurb}</p>
                    {ctaText && (<a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>)}
                </div>
                <div className="col-1-60">
                {
                    mediaType === "Image" && (
                        <div className="text-padding-left">
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </div>
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
               </div>
           )
           }
           {contentPosition === "Right" && (
               <div className="max-80">
               <div className={`flex ${paddingType}`}>
                <div className="col-1-60">
                {
                    mediaType === "Image" && (
                        <div className="text-padding-right">
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </div>
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
                <div className="col-1-40 text-padding-left">
                { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.rightIcon}/></p>)}
                    <p className="sans-serif sub-heading-bold black left">{subHeadline}</p>
                    <p className="serif heading black left">{headline}</p>
                    <p className="sans-serif body-copy black left">{blurb}</p>
                    {ctaText && (<a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>)}
                </div>
               </div>
               </div>
           )
           }
           {contentPosition === "Over Background Left" && (
               <div className={`flex ${paddingType}`}>
                    {
                    mediaType === "Image" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundImage}`} style={{ backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                            <div class="max-80">
                            <div class="flex">
                            <div class="col-1-40">
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.rightIcon}/></p>)}
                            <p className="sans-serif sub-heading-bold white left">{subHeadline}</p>
                            <p className="serif heading white left">{headline}</p>
                            <p className="sans-serif body-copy white left">{blurb}</p>
                            {ctaText && (
                                <a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>
                            )
                            }
                            </div>
                            </div>
                            </div>
                        </div>
                    )
                }
                {
                    mediaType === "video" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundVideo}`}>
                            <div class={styles.overBackground}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.rightIcon}/></p>)}
                            <p className="sans-serif sub-heading-bold white left">{subHeadline}</p>
                            <p className="serif heading white left">{headline}</p>
                            <p className="sans-serif body-copy white left">{blurb}</p>
                            {ctaText && (
                                <a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>
                            )
                            }
                            </div>
                            <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={mp4OrExternalLink} type="video/mp4" />
                                    <source src={webm} type="video/webm" />
                            </video>
                        </div>
                    )
                }
               </div>
           )
           }

{contentPosition === "Over Background Right" && (
               <div className={`flex ${paddingType}`}>
                    {
                    mediaType === "Image" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundImage}`} style={{ backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                            <div class="max-80">
                            <div class="flex">
                            <div class="col-1-60">
                            </div>
                            <div class="col-1-40">
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.rightIcon}/></p>)}
                            <p className="sans-serif sub-heading-bold white left">{subHeadline}</p>
                            <p className="serif heading white left">{headline}</p>
                            <p className="sans-serif body-copy white left">{blurb}</p>
                            {ctaText && (
                                <a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>
                            )
                            }
                            </div>
                            </div>
                            </div>
                        </div>
                    )
                }
                {
                    mediaType === "video" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundVideo}`}>
                            <div class={styles.overBackground}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={styles.rightIcon}/></p>)}
                            <p className="sans-serif sub-heading-bold white left">{subHeadline}</p>
                            <p className="serif heading white left">{headline}</p>
                            <p className="sans-serif body-copy white left">{blurb}</p>
                            {ctaText && (
                                <a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>
                            )
                            }
                            </div>
                            <video className={styles.videoBG} autoPlay playsInline muted loop>
                                    <source src={mp4OrExternalLink} type="video/mp4" />
                                    <source src={webm} type="video/webm" />
                            </video>
                        </div>
                    )
                }
               </div>
           )
           }
        </section>
    )
}