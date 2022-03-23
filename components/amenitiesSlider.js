import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/amenitiesSlider.module.css';

export default function AmenitiesSlider({ amenities, subHeader, header, ctaText, ctaLink }) {
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);

    return (
        <section className={styles.amenitiesSlider} >
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
                    amenities.map((amenity, index) => {
                        return (
                            <div key={amenity.title} className={styles.amenity}>
                                <Image src={amenity.featuredImage.node.sourceUrl} alt={amenity.title} width={1435} height={928} layout="intrinsic" />
                           
                            <div className={`${styles.sliderContent} ${ sliderActive == index ? styles.showcontent : '' }`}>
                                <p className="sans-serif-bold sub-heading white">{subHeader}</p>
                                <p className="heading white" style={{ margin: 0 }}>{header}</p>
                                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
                            </div>
                            </div>
                        )
                    })
                }
            </Flickity>
            
            <div className={styles.sliderNav}>
                {
                    amenities.map((amenity, index) => {
                        return (
                            <p key={`${amenity.title}-nav`} className={`${ sliderActive == index ? styles.active : '' }`} style={{ margin: '0 1rem' }}>
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