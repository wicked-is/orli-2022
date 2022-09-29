import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from '../styles/amenitiesSlider.module.css';

export default function AmenitiesSlider(props) {
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    let isMobileDevice;

    const {
        anchor,
        types,
        amenities,
        subHeadline: title,
        headline: blurb,
        description,
        ctaText,
        ctaLink
    } = props;

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }

    useEffect(() => {
        var slidersections = gsap.utils.toArray('.sliderfadein');

        slidersections.forEach((slidersection) => {
            gsap.to(slidersection, { autoAlpha: 1,
                scrollTrigger: {
                    trigger: slidersection,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse"
                }
            });
        });

    },[])

    useEffect(() => {
        isMobileDevice = window.matchMedia("screen and (max-width: 768px)").matches;
    }, [])

    const [dimensions, setDimensions] = useState({ 
        height: null,
        width: null
    })
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

            if (window.innerWidth < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);

    const sliderStructure = (types) => {
        switch (types) {
            case 'Amenities':
                return (
                    <>
                    { anchor && <a id={anchor} name={anchor} className="anchor"></a>}
            <div className={`${styles.sliderContent} sliderfadein`}>
                <p className="sans-serif-bold sub-heading white">{title}</p>
                {blurb && <p className="heading white" style={{ margin: 0 }}>{blurb}</p>}
                { description && !isMobileDevice && <p className="sans-serif body-copy white desc">{description}</p> }
                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className="amenitiesSliderarrows">
            <Flickity
                options={{
                    draggable: true,
                    cellAlign: 'left',
                    prevNextButtons: true,
                    arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',
                    pageDots: false,
                    wrapAround: true,
                    imagesLoaded: true,
                    selectedAttraction: 0.007,
                    friction: 0.17,
                    autoPlay: 5500,
                    pauseAutoPlayOnHover: true,
                    asNavFor: '.sliderNav',
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    amenities.map((item, index) => {
                        return (
                            <div key={item.title} className={styles.item} style={{ backgroundImage: isMobile ? null : `url(${item.featuredImage.node.mediaItemUrl})` }} data-mobile={isMobile}>
                                <p className={`${styles.mobileTitle} serif heading white left textshadow`}>
                                    <a href={item.amenityContent?.sliderLink}>{item.title}</a>
                                </p>
                                {
                                    !isMobileDevice && (
                                        <Image src={item.amenityContent?.mobileSliderImage?.mediaItemUrl} alt={item.amenityContent?.mobileSliderImage?.altText} width={856} height={890} layout="intrinsic" className={styles.mobileSliderImg}/>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </Flickity>
            </div>
            <div className={`${styles.sliderNav} sliderfadein`}>
                {
                    amenities.map((amenity, index) => {
                        return (
                            <p key={`${amenity.title}-nav`} className={`${ sliderActive == index ? styles.active : '' }`}>
                                <a className={styles.navItem} data-slide={index} onClick={changeSlider}>
                                    {amenity.title}
                                </a>
                            </p>
                        )
                    })
                }
            </div>
            </>
                )
            case 'Events':
                return (
                    <>
                    { anchor && <a id={anchor} name={anchor} className="anchor"></a>}
            <div className={`${styles.sliderContent} sliderfadein`}>
                <p className="sans-serif-bold sub-heading white">{title}</p>
                {blurb && <p className="heading white" style={{ margin: 0 }}>{blurb}</p>}
                { description && !isMobileDevice && <p className="sans-serif body-copy white desc">{description}</p> }
                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className="eventsSlider">
            <Flickity
                options={{
                    draggable: true,
                    cellAlign: 'left',
                    prevNextButtons: true,
                    arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',
                    pageDots: false,
                    wrapAround: true,
                    imagesLoaded: true,
                    // autoPlay: 7000,
                    asNavFor: '.sliderNavEvents',
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    amenities.map((item, index) => {
                        return (
                            <div key={item.title} className={styles.item} style={{ backgroundImage: `url(${item.featuredImage.node.mediaItemUrl})` }}>
                                <p className={`${styles.mobileTitle} serif heading white left textshadow`}>
                                    {item.title}
                                </p>
                                {
                                    !isMobileDevice && (
                                        <img src={item.featuredImage.node.mediaItemUrl} alt={item.featuredImage.node.altText} layout="responsive" className={styles.mobileSliderImg}/>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </Flickity>
            </div>
            <div className={`${styles.sliderNavEvents} sliderfadein`}>
                {
                    amenities.map((amenity, index) => {
                        return (
                            <p key={`${amenity.title}-nav`} className={`${ sliderActive == index ? styles.active : '' }`}>
                                <a className={styles.navItem} data-slide={index} onClick={changeSlider}>
                                    {amenity.title}
                                </a>
                            </p>
                        )
                    })
                }
            </div>
            </>
                )
                default:
                return null;
            }
    }
    
    return (
        <section className={`${styles.amenitiesSlider} amenitiesSliderglobal`} >
            { sliderStructure(types) }
        </section>
    )
}