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
        <section className={`${styles.roomGallerySlider} amenitiesSliderglobal`} >
            <p onClick={toggleGallery} style={{ cursor: "pointer", color: "white", fontSize: "2rem", position: "fixed", top: "3.5rem", right: "2rem", zIndex: 999 }}>&#10005;</p>
            <Flickity
                options={{
                    draggable: true,
                    cellAlign: 'left',
                    prevNextButtons: true,
                    pageDots: false,
                    wrapAround: true,
                    imagesLoaded: true,
                    autoPlay: 6000,
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
                            <div key={`gallery-item-${index}`} className={styles.item} style={{ backgroundImage: `url(${item.mediaItemUrl})` }}>
                                {
                                    !isMobileDevice && (
                                        <Image src={item.mediaItemUrl} width={1465} height={928} layout="intrinsic" />
                                    )
                                }
                            </div>
                        )
                    })
                }
            </Flickity>
        </section>
    )
}