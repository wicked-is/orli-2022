import Image from 'next/image'
import Link from 'next/link';
import Flickity from 'react-flickity-component'
import styles from '../styles/roomSlider.module.css'

import "flickity/css/flickity.css";
import "flickity-as-nav-for"

export default function RoomSlider({ rooms }) {
    
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
                flickityRef={c => this.flktyA = c}
            >
                {
                    rooms.map(room => {
                        return (
                            <div className={styles.room}>
                                
                                <Image src={room.featuredImage.node.sourceUrl} alt={room.title} width={1436} height={1020} layout="intrinsic" />
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.roomSliderNavigation} >
                <Flickity
                    options={{
                        prevNextButtons: false,
                        pageDots: false,
                        draggable: false,
                        wrapAround: true,
                        asNavFor: this.flktyA
                    }}
                    flickityRef={c => this.flktyB = c}
                >
                    {
                        rooms.map(room => {
                            return (
                                <p>
                                    <a>
                                        {room.title}
                                    </a>
                                </p>
                            )
                        })
                    }
                </Flickity>
            </div>
        </section>
    )
}