import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/amenitiesSlider.module.css';

export default function FeaturedStorySlider(props) {
    const slider = useRef(null)
    const [sliderActive, setSliderActive] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const {
        featuredStories,
        subHeadline: title,
        headline: blurb,
        ctaText,
        ctaLink
    } = props;

    const changeSlider = (e) => {
        slider.current.select(e.target.dataset.slide)
    }

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);

    return (
        <section className={styles.amenitiesSlider} >
            <Flickity
                options={{
                    cellAlign: 'left',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    imagesLoaded: true,
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
                className="featured-story-slider"
            >
                {
                    featuredStories[0].blogPost.gallery.map((story, index) => {
                        return (
                            <div key={story.altText} className={styles.story} style={{ paddingRight: '3rem' }}>
                                <Image src={story.mediaItemUrl} alt={story.altText} width={1335} height={928} layout="intrinsic" style={{ marginRight: '1rem' }} />
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.sliderContent}>
                <p className="sans-serif-bold sub-heading white">{title}</p>
                <p className="heading white" style={{ margin: 0 }}>{featuredStories[0].title}</p>
                <p className="sans-serif xs-copy white" style={{ textDecoration: 'underline'}}><a href={ctaLink}>{ctaText}</a></p>
            </div>
            <div className={styles.sliderNav}>
                {
                    featuredStories.map((story, index) => {
                        return (
                            <p key={`${story.title}-nav`} className={`${ sliderActive == index ? styles.active : '' }`}>
                                <a className={styles.navItem} data-slide={index} onClick={changeSlider}>
                                    {story.title}
                                </a>
                            </p>
                        )
                    })
                }
            </div>
        </section>
    )
}