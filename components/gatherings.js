import styles from '../styles/gatherings.module.css';
import ThreePartHeading from './threePartHeading';

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
                <Image src="" width={561} height={370} layout="intrinsic" />
            </div>
            <div>
                <Image src="" width={561} height={370} layout="intrinsic" />
                <EventFeed events={events} />
            </div>
        </section>
    )
}