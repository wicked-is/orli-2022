import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/amenitiesSlider.module.css';

export default function RoomGallerySlider(props) {
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    let isMobileDevice;

    const {
        gallery,
        toggleGallery
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
        <section className={`${styles.roomGalleryHeroSlider} amenitiesSliderglobal`} style={{ zIndex: '97 !important'}} >
            <p onClick={toggleGallery} className={styles.closeroomslider}>&#10005;</p>
            <Flickity
                options={{
                    cellAlign: 'left',
                    draggable: true,
                    prevNextButtons: true,
                    imagesLoaded: true,
                    contian: true,
                    pageDots: false,
                    wrapAround: true,
                    arrowShape: 'M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z',

                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    gallery.map((item, index) => {
                        return (
                            <div key={`gallery-item-${index}`} className={styles.item}>
                                <img src={item.mediaItemUrl} alt={item.altText} />
                            </div>
                        )
                    })
                }
            </Flickity>
        </section>
    )
}