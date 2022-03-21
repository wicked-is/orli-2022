import { useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Flickity from 'react-flickity-component'
    
import styles from '../styles/roomSlider.module.css'

import "flickity/css/flickity.css";

export default function RoomSlider({ rooms }) {

    const slider = useRef(null)
    const sliderNavigation = useRef(null)

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }
    
    return (
        <section className={styles.roomSlider}>
            <a className={styles.cta} >Find Your Room</a>
            {/* map over images */}
            <Flickity
                options={{
                    cellAlign: 'center',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    fullscreen: true,
                    autoPlay: 7000
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    rooms.map(room => {
                        return (
                            <div key={room.title} className={styles.room}>
                                <Image src={room.featuredImage.node.sourceUrl} alt={room.title} width={1436} height={1020} layout="intrinsic" />
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.roomSliderNavigation}>
                {
                    rooms.map((room, index) => {
                        let slideNum = index
                        return (
                            <p key={room.title} style={{ margin: '0 1rem' }}>
                                <a data-slide={index} onClick={changeSlider}>
                                    {room.title}
                                </a>
                            </p>
                        )
                    })
                }
            </div>
        </section>
    )
}