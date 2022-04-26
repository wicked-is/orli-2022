import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Flickity from 'react-flickity-component'
    
import styles from '../styles/roomSlider.module.css'

import "flickity/css/flickity.css";

export default function RoomSlider(props) {

    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const { rooms } = props

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);
    
    return (
        <section className={styles.roomSlider}>
            <Link href="/rooms">
                <span className="sans-serif white xs-copy"><a className={styles.cta} >Find Your Room</a></span>
            </Link>
            {/* map over images */}
            <Flickity
                options={{
                    cellAlign: 'center',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    asNavFor: '.roomSliderNavigation',
                    imagesLoaded: true,
                    // fullscreen: true,
                    autoPlay: 5000,
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    rooms.map(room => {
                        return (
                            <div key={room.title} className={styles.room}>
                                <Image src={room.featuredImage.node.mediaItemUrl} alt={room.altText} width={1436} height={1020} layout="intrinsic" />
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.roomSliderNavigation}>
                {
                    rooms.map((room, index) => {
                        return (
                            <p key={room.title} className={`${ sliderActive == index ? styles.active : '' }`} style={{ margin: '0 1rem' }}>
                                <a className={styles.navItem} data-slide={index} onClick={changeSlider}>
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