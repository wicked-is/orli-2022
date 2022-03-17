import { useState } from 'react';
// need flickity

import styles from '../styles/amenitiesSlider.module.css';

export default function AmenitiesSlider({ amenities }) {

    const [subheader, setSubheader] = useState('');
    const [header, setHeader] = useState('');
    const [ctaLink, setCtaLink] = useState('');
    const [ctaText, setCtaText] = useState('');

    return (
        <section className={styles.amenitiesSlider} >
            {/* slider images */}
            <div className={styles.sliderContent}>
                {/* dynamically change content */}
                <p>{subheader}</p>
                <p>{header}</p>
                <p><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className={styles.sliderNav}>
                {/* map nav items */}
            </div>
        </section>
    )
}