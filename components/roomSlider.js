import { useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Flickity from 'react-flickity-component'
    
import styles from '../styles/roomSlider.module.css'

import "flickity/css/flickity.css";

export default function RoomSlider({ rooms }) {

    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
        setSliderActive(e.target.dataset.slide)
    }
    
    return (
        <section className={styles.roomSlider}>
            <Link href="/rooms">
                <span className="white xs-copy"><a className={styles.cta} >Find Your Room</a></span>
            </Link>
            {/* map over images */}
            <Flickity
                options={{
                    cellAlign: 'center',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    // fullscreen: true,
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
                        return (
                            <p key={room.title} style={{ margin: '0 1rem' }}>
                                <a className={`${styles.navItem} ${sliderActive == index ? 'active' : ''}`} data-slide={index} onClick={changeSlider}>
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