import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/a11y";

import styles from '../styles/HistoricTimeline.module.css';

export default function HistoricalSlider(props) {

    const swiperRef = useRef(null)
    const titleId = useId()

    const { years } = props;
    const [sliderActive, setSliderActive] = useState(0)

    const changeSlider = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index)
        }
    }

    // The nav items stay <a> elements so the existing `.sliderNav p a` rules keep
    // applying, so they need the keyboard behaviour a real <button> would give.
    const handleNavKeyDown = (e, index) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault()
            changeSlider(index)
        }
    }

    const handleSlideChange = (swiper) => {
        setSliderActive(swiper.realIndex)
    }

    return (
        <section className={`${styles.historicTimelineContainer} timelineSliderglobal`} aria-labelledby={titleId}>
            <Swiper
                modules={[A11y, Keyboard]}
                spaceBetween={0}
                slidesPerView={1}
                loop={years?.length > 1}
                observer={true}
                observeParents={true}
                a11y={{
                    enabled: true,
                    containerMessage: 'Building History timeline',
                    containerRoleDescriptionMessage: 'carousel',
                    itemRoleDescriptionMessage: 'slide',
                    slideLabelMessage: 'Slide {{index}} of {{slidesLength}}',
                }}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                onSlideChange={handleSlideChange}
            >
                {
                    years.map((year, index) => {
                        let nextIndex = index + 1
                        let previousYear = years[nextIndex]?.year || years[0]?.year

                        return (
                            <SwiperSlide key={year.year} className={`${styles.year} ${styles.singleyear}` } style={{ backgroundImage: `url(${year.image.mediaItemUrl})` }}>
                                <Image src={year.image.mediaItemUrl} alt={year.image.altText} width={1920} height={969} layout="responsive" sizes="100vw" />
                                <div className={styles.yearTextContainer}>
                                    <div className={styles.yearContentContainer}>
                                        <p className={`xl-heading ${styles.actualyear} center`} data-text={previousYear} style={{ lineHeight: 1 }}>{year.year}</p>
                                        <p className="sans-serif-bold uppercase" style={{ letterSpacing: 'var(--letter-spacing)'}} dangerouslySetInnerHTML={{ __html: year.caption }}></p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className={styles.sliderNavContainer}>
                    <h2 id={titleId} className={`serif heading white ${styles.sliderTitle}`}>Building History</h2>
                    <div className={styles.sliderNav}>
                        {
                            years.map((year, index) => {
                                return (
                                    <p key={`${year.year}-nav`} className={`${ sliderActive == index ? styles.active : '' }`}>
                                        <a className={`${styles.navItem} ${ sliderActive == index ? styles.active : '' }`}
                                           role="button"
                                           tabIndex={0}
                                           aria-current={sliderActive == index ? 'true' : undefined}
                                           data-slide={index}
                                           onClick={() => changeSlider(index)}
                                           onKeyDown={(e) => handleNavKeyDown(e, index)}>
                                            {year.year}
                                            <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/07/Orli_WhiteArrow-1.png" alt="" aria-hidden="true"/>
                                        </a>
                                        <span className={`sans-serif-bold uppercase ${styles.mobiledescription} ${ sliderActive == index ? styles.active : '' }`} dangerouslySetInnerHTML={{ __html: year.caption }}></span>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
        </section>
    )
}
