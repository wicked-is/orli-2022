import Image from 'next/image';
import ThreePartHeading from './threePartHeading';
import EventFeed from './eventFeed';

import styles from '../styles/gatherings.module.css';

export default function Gatherings({ subhead, header, mainCtaText, mainCtaLink, leftPhoto, leftCtaText, leftCtaLink, rightPhoto, rightCtaText, rightCtaLink, events }) {
    return (
        <section className={styles.gatheringsContainer} >
            <div>
                <ThreePartHeading
                    subheader="Gatherings"
                    header="For You and Your Crew"
                    ctaText="Come Together"
                    ctaLink="/"
                />
                <div className={styles.videoBackground}>
                    <video autoPlay playsInline muted poster="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg">
                        <source src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.mp4" type="video/mp4" />
                    </video>
                </div>
                <p><a href={ leftCtaLink }>{ leftCtaText }</a></p>
            </div>
            <div>
                <>
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" width={561} height={370} layout="intrinsic" />
                    <p><a href={rightCtaLink}>{rightCtaText}</a></p>
                </>
                <EventFeed events={events} />
            </div>
        </section>
    )
}