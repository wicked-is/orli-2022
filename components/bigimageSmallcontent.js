import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import styles from '../styles/bigimagesmallcontent.module.css';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";
import styled from "styled-components";

const SliderNavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`

export default function BigImageSmallContent(props) {
    const slider = useRef(null)

    const [sliderActive, setSliderActive] = useState(0)
    const [currentSlider, setCurrentSlider] = useState('1')
    const [currentSliderLength, setCurrentSliderLength] = useState('')

    useEffect(() => { 
        if (slider.current !== null) {
            setCurrentSliderLength(slider.current.cells.length);
            slider.current.on('change', () => {
                setCurrentSlider(slider.current.selectedIndex + 1)
                setCurrentSliderLength(slider.current.cells.length);
            })

            document.querySelector('#previous-arrow').addEventListener('click', () => slider.current.previous())
            document.querySelector('#next-arrow').addEventListener('click', () => slider.current.next())
        }
    }, [slider])


    const {
        contentPosition,
        subHeadline,
        greyBackground,
        headline,
        blurb,
        ctaLink,
        ctaText,
        icon,
        media,
        order,
        anchorTag,
        imagePoster,
        paddingType,
        mediaFullWidth,
        mediaType,
        mp4OrExternalLink,
        webm,
        slides } = props
    
    return (
        <section className={`${styles.container} ${order == 0 ? 'padding-top': ''} ${greyBackground !== null && greyBackground == true ? `bg-lt-grey` : null}`}>
           {contentPosition === "Left" && (
               <div className="max-80 fadein">
                   { anchorTag && (
                       <a id={anchorTag} name={anchorTag} className={styles.anchor}></a>
                   )}
               <div className={`${styles.flex} ${paddingType}`}>
                <div className={`${styles.col140} ${styles.textPaddingRight}`}>
                    { icon && (
                        <p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.leftIcon}`}/></p>
                        )
                    }
                    <p className="sans-serif sub-heading-bold black left">{subHeadline}</p>
                    <p className="serif heading black left">{headline}</p>
                    <div className="sans-serif body-copy black left" dangerouslySetInnerHTML={{ __html: blurb}} ></div>
                    {ctaText && (<a href={ctaLink} className="sans-serif xs-copy black left cta-black">{ctaText}</a>)}
                </div>
                <div className={styles.col160}>
                {
                    mediaType === "Image" && (
                        <div className={styles.textPaddingLeft}>
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </div>
                    )
                }
                {
                        mediaType === "Slider" && (
                        <>
                            <Flickity
                                options={{
                                    cellAlign: 'center',
                                    prevNextButtons: false,
                                    pageDots: false,
                                    draggable: true,
                                    wrapAround: true,
                                    imagesLoaded: true,
                                    adaptiveHeight: true
                                }}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate={false} // default false
                                static // default false
                                flickityRef={c => {
                                    slider.current = c
                                }}
                            >
                                {
                                    slides.map((slides, index) => {
                                        return (
                                            <>
                                                <div key={`slide-${slides.index}`} className={styles.slides}>
                                                    <img src={slides.mediaItemUrl} alt={slides.altText} className={styles.sliderimage} layout="intrinsic" />
                                                </div>
                                            </>
                                        )}
                                    )
                                }           
                            </Flickity>    
                            <SliderNavigationContainer>
                                <div className="serif brown">
                                    {currentSlider}/{currentSliderLength} 
                                </div>
                                <div className="brown">
                                    <img id="previous-arrow" src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png" style={{ transform: 'rotate(180deg)', marginRight: '1rem', width: '37px', height: '22px' }} />
                                    <img id="next-arrow" src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png" style={{ width: '37px', height: '22px' }} />
                                </div>
                            </SliderNavigationContainer>
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
               <div className="max-80 fadein reorder">
                   { anchorTag && (
                       <a id={anchorTag} name={anchorTag} className="anchor"></a>
                   )}
               <div className={`${styles.flex} ${paddingType}`}>
                <div className={styles.col160}>
                {
                    mediaType === "Image" && (
                        <div className={styles.textPaddingRight}>
                            <Image src={imagePoster.mediaItemUrl} alt={imagePoster.altText} width={561} height={370} layout="responsive" />
                        </div>
                    )
                }
                {
                    mediaType === "Slider" && (
                        <Flickity
                options={{
                    cellAlign: 'center',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    imagesLoaded: true,
                    adaptiveHeight: true
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    slides.map((slides, index) => {
                        return (
                         <div key={`slide-ind${index}`} className={styles.slides}>
                             <img src={slides.mediaItemUrl} alt={slides.altText} className={styles.sliderimage} layout="intrinsic" />
                        </div>
                        )}
                    )
                }
            </Flickity>
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
                <div className={`${styles.col140} ${styles.textPaddingLeft}`}>
                { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.rightIcon}`}/></p>)}
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
               <div className={`${styles.flex} ${paddingType} fadein`}>
                   { anchorTag && (
                       <a id={anchorTag} name={anchorTag} className="anchor"></a>
                   )}
                    {
                    mediaType === "Image" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundImage}`} style={{ backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                            <div className="max-80">
                            <div className="flex">
                            <div className={styles.col140}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.rightIcon}`}/></p>)}
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
                            <div className={styles.overBackground}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.rightIcon}`}/></p>)}
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
               <div className={`${styles.flex} ${paddingType} fadein`}>
                   { anchorTag && (
                       <a id={anchorTag} name={anchorTag} className="anchor"></a>
                   )}
                    {
                    mediaType === "Image" && (
                        <div className={`${styles.halfBanner} ${styles.backgroundImage}`} style={{ backgroundImage: `url(${imagePoster.mediaItemUrl})`}}>
                            <div className="max-80">
                            <div className={styles.flex}>
                            <div className={styles.col160}>
                            </div>
                            <div className={styles.col140}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.rightIcon}`}/></p>)}
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
                            <div className={`${styles.overBackground} fadein`}>
                            { icon && (<p className="right"><img src={icon?.mediaItemUrl} alt={icon?.altText} layout="responsive" className={`${styles.rightIcon}`}/></p>)}
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