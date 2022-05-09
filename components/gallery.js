import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/gallery.module.css'

export default function Gallery(props) {
    const {
        items,
        filters
    } = props

    
    return (
        <section>
            <div className={styles.bigheroSubnav}>
                <ul className={styles.subnavigationonlyContainer}>
                    {
                        // This was the incorrect bit. You were calling parameters
                        // on the item without having the item defined. 
                        // When you're back we can huddle if you'd like.
                        filters.map((item, index) => {
                            return (
                                <li key={`ni-${index}`} >
                                    <a href={item.link}>
                                    <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                                    <p className="black xs-copy uppercase center">{item.label}</p>
                                    </a>
                                </li>
                                )
                        })
                    }
                </ul>
            </div>
    <div className={styles.galleryContainer}>
        <ResponsiveMasonry columnsCountBreakPoints={{600: 1, 800: 2, 900: 2}}>
            <Masonry columnsCount={2} gutter="10px">
            {
            items.map((item, index) => {
                return (
                    <div key={index}>
                        {item.type === 'Image' && item.filter === 'Rooms' && (
                            <img src={item.image.mediaItemUrl} alt={item.image.altText} className={item.filter} style={{width: "100%", display: "block"}}/>
                        )}
                        {item.type === 'Video' && item.filter === 'Rooms' && (
                            <div className={styles.videoContainer}>
                            <video className={item.filter} autoPlay playsInline muted loop poster="">
                                <source src={item.mp4ExternalLink} type="video/mp4" />
                                <source src={item.webm} type="video/webm" />
                            </video>
                            </div>
                        )}
                        {item.type === 'Image' && item.filter === 'Amenities' && (
                            <img src={item.image.mediaItemUrl} alt={item.image.altText} className={item.filter} style={{width: "100%", display: "block"}}/>
                        )}
                        {item.type === 'Video' && item.filter === 'Amenities' && (
                            <div className={styles.videoContainer}>
                            <video className={item.filter} autoPlay playsInline muted loop poster="">
                                <source src={item.mp4ExternalLink} type="video/mp4" />
                                <source src={item.webm} type="video/webm" />
                            </video>
                            </div>
                        )}
                        {item.type === 'Image' && item.filter === 'Neighborhood' && (
                            <img src={item.image.mediaItemUrl} alt={item.image.altText} className={item.filter} style={{width: "100%", display: "block"}}/>
                        )}
                        {item.type === 'Video' && item.filter === 'Neighborhood' && (
                            <div className={styles.videoContainer}>
                            <video className={item.filter} autoPlay playsInline muted loop poster="">
                                <source src={item.mp4ExternalLink} type="video/mp4" />
                                <source src={item.webm} type="video/webm" />
                            </video>
                            </div>
                        )}
                        {item.type === 'Video' && item.filter === 'Video' && (
                            <div className={styles.videoContainer}>
                            <video className={item.filter} autoPlay playsInline muted loop poster="">
                                <source src={item.mp4ExternalLink} type="video/mp4" />
                                <source src={item.webm} type="video/webm" />
                            </video>
                            </div>
                        )}   
                     </div>
                )
            })
            }
            </Masonry>
        </ResponsiveMasonry>
    </div>
    </section>
    )
}