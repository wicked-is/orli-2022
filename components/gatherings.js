import Image from 'next/image';
import ThreePartHeading from './threePartHeading';
import EventFeed from './eventFeed';

import styles from '../styles/gatherings.module.css';

export default function Gatherings({ subhead, header, mainCtaText, mainCtaLink, leftPhoto, leftCtaText, leftCtaLink, rightPhoto, rightCtaText, rightCtaLink, events }) {
    return (
        <section className={`${styles.gatheringsContainer} max-80`}>
            <div className={styles.left}>
                <ThreePartHeading
                    subheader="Gatherings"
                    header="For You and Your Crew"
                    ctaText="Come Together"
                    ctaLink="/"
                />
                <div className={`${styles.videoBackground}`}>
                    <div>
                        <video className={styles.videoBG} autoPlay playsInline muted loop>
                            <source src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/pexels-pavel-danilyuk-7318864.mp4" type="video/mp4" />
                            <source src="https://orlidev.wpengine.com/wp-content/uploads/2022/02/orlihero3-1.webm" type="video/webm" />
                        </video>
                    </div>
                    <p>Host An Event</p>
                </div>
                <p><a href={ leftCtaLink }>{ leftCtaText }</a></p>
            </div>
            <div className={styles.right}>
                <>
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_Gatherings_PlanYourWeddingWeb.jpg" width={561} height={370} layout="responsive" />
                    <p><a href={rightCtaLink}>{rightCtaText}Plan Your Wedding</a></p>
                </>
                <EventFeed events={events} />
            </div>
        </section>
    )
}