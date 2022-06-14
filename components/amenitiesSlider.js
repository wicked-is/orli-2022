import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/amenitiesSlider.module.css';

export default function AmenitiesSlider(props) {
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    let isMobileDevice;

    const {
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
        isMobileDevice = window.matchMedia("screen and (max-width: 768px)").matches;
    }, [])

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);

    return (
        <section className={`${styles.amenitiesSlider}`} >
            <Flickity
                options={{
                    cellAlign: 'left',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    imagesLoaded: true,
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
                            <div key={item.title} className={styles.item} style={{ backgroundImage: isMobileDevice ? `url(${item.featuredImage.node.mediaItemUrl})` : '', marginRight: '3rem' }}>
                                {
                                    !isMobileDevice && (
                                        <Image src={item.featuredImage.node.mediaItemUrl} alt={item.title} width={1435} height={928} layout="intrinsic" />
                                    )
                                }
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={`${styles.sliderContent} fadein`}>
                <p className="sans-serif-bold sub-heading white">{title}</p>
                {blurb && <p className="heading white" style={{ margin: 0 }}>{blurb}</p>}
                { description && !isMobileDevice && <p className="sans-serif body-copy white desc">{description}</p> }
                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className={`${styles.sliderNav} fadein`}>
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
        </section>
    )
}