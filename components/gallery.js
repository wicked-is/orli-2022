import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/gallery.module.css'

export default function Gallery(props) {
    const {
        items
    } = props

    
    return (
        <section className={styles.galleryContainer}>
        <ResponsiveMasonry columnsCountBreakPoints={{600: 1, 800: 2, 900: 2}}>
            <Masonry columnsCount={2} gutter="10px">
            {
            items.map((item, index) => {
                return (
                    <div key={index}>
                        {item.image && (
                            <img src={item.image.mediaItemUrl} alt={item.image.altText} className={item.filter} style={{width: "100%", display: "block"}}/> 
                        )}
                        {item.mp4ExternalLink && (
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
        </section>
    )
}