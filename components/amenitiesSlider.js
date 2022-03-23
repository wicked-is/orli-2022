import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/amenitiesSlider.module.css';

export default function AmenitiesSlider({ amenities, subHeader, header, ctaText, ctaLink }) {
    return (
        <section className={styles.amenitiesSlider} >
            <Flickity
                options={{
                    cellAlign: 'left',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    autoPlay: 7000
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
            >
                {
                    amenities.map(amenity => {
                        return (
                            <div key={amenity.title} className={styles.amenity}>
                                <Image src={amenity.featuredImage.node.sourceUrl} alt={amenity.title} width={1435} height={928} layout="intrinsic" />
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.sliderContent}>
                <p className="sans-serif-bold sub-heading white">{subHeader}</p>
                <p className="heading white" style={{ margin: 0 }}>{header}</p>
                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className={styles.sliderNav}>
                {
                    amenities.map(amenity => {
                        return (
                            <p key={`${amenity.title}-nav`} className={styles.navItem}>
                                {amenity.title}
                            </p>
                        )
                    })
                }
            </div>
        </section>
    )
}