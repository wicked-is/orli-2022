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
    const [dimensions, setDimensions] = useState({ 
        height: null,
        width: null
    })
    const [isMobile, setIsMobile] = useState(false)

    const { rooms } = props

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }
    
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

    // useEffect(() => {
    //     let isMobileDevice = window.matchMedia("screen and (max-width: 768px)").matches;

    //     if (isMobileDevice) {
    //         setIsMobile(true)
    //     }
    // }, [window.innerWidth, window.innerHeight])

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);
    
    return (
        <section className={`${styles.roomSlider} roomsSliderglobal`}>
            <p className={`${styles.roomHeading} serif heading white`}>Rooms</p>
            {/*<Link href="/rooms">
                <span className="sans-serif white xs-copy fadein"><a className={styles.cta} >Find Your Room</a></span>
            </Link>*/}
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
                    // autoPlay: 5000,
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
                            <div key={room.title} className={styles.room} style={{ backgroundImage: `url(${room.singleRooms.roomshero.mediaItemUrl})` }}>
                                <p className={`${styles.roommobile} serif heading white`}>{room.title}</p>
                                {
                                    <Image src={room.singleRooms.roomshero.mediaItemUrl} alt={room.singleRooms.roomshero.altText} width={1436} height={1020} layout="intrinsic" />
                                }
                                <div className={styles.bottomgradient}></div>
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={`${styles.roomSliderNavigation}`}>
                {
                    rooms.map((room, index) => {
                        return (
                            <p key={room.title} className={`${ sliderActive == index ? styles.active : 'sub-heading-bold' }`} style={{ margin: '0 1rem' }}>
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