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
        <ResponsiveMasonry columnsCountBreakPoints={{416: 1, 800: 2, 900: 3}}>
            <Masonry columnsCount={3} gutter="10px">
            {
            items.map((item, index) => {
                return (
                    <div key={index}>
                        {item.image && (
                            <img src={item.image.mediaItemUrl} alt={item.image.altText} style={{width: "100%", display: "block"}}/> 
                        )}
                        {item.mp4ExternalLink && (
                            <video className={styles.videoContainer} autoPlay playsInline muted loop poster="">
                                <source src={item.mp4ExternalLink} type="video/mp4" />
                                <source src={item.webm} type="video/webm" />
                            </video>
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