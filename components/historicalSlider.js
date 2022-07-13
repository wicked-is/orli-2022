import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

import styles from '../styles/HistoricTimeline.module.css';

export default function HistoricalSlider(props) {
    
    const slider = useRef(null)

    const { years } = props;
    const [sliderActive, setSliderActive] = useState(0)

    const changeSlider = (index) => {
        slider.current.select(index)
    }

    useEffect(() => {
        slider.current.on('change', () => {
            setSliderActive(slider.current.selectedIndex)
        })
    }, [sliderActive]);

    return (
        <section className={styles.historicTimelineContainer}>
            <Flickity
                options={{
                    cellAlign: 'left',
                    prevNextButtons: false,
                    pageDots: false,
                    draggable: true,
                    wrapAround: true,
                    imagesLoaded: true,
                    fullscreen: true,
                }}
                disableImagesLoaded={false} // default false
                reloadOnUpdate={false} // default false
                static // default false
                flickityRef={c => {
                    slider.current = c
                }}
            >
                {
                    years.map((year, index) => {
                        let nextIndex = index + 1
                        let previousYear = years[nextIndex]?.year || years[0]?.year
                        
                        return (
                            <div key={year.year} className={`${styles.year} single-year` }>
                                <Image src={year.image.mediaItemUrl} alt={year.image.altText} width={1920} height={969} layout="responsive" sizes="100vw" />
                                <div className={styles.yearTextContainer}>
                                    <div className={styles.yearContentContainer}>    
                                        <p className="xl-heading actual-year center" data-text={previousYear} style={{ lineHeight: 1 }}>{year.year}</p>
                                        <p className="sans-serif-bold uppercase" style={{ letterSpacing: 'var(--letter-spacing)'}} dangerouslySetInnerHTML={{ __html: year.caption }}></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Flickity>
            <div className={styles.sliderNavContainer}>
                <div className="max-80">
                    <p className={`serif heading white ${styles.sliderTitle}`}>Building History</p>
                    <div className={styles.sliderNav}>
                        {
                            years.map((year, index) => {
                                return (
                                    <p key={`${year.year}-nav`} className={`${ sliderActive == index ? styles.active : '' }`}>
                                        <a className={styles.navItem} data-slide={index} onClick={() => changeSlider(index)}>
                                            {year.year}
                                        </a>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}