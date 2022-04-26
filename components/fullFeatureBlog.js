import ThreePartHeading from './threePartHeading';
import styles from '../styles/fullFeatureBlog.module.css';

export default function FullFeatureBlog(props) {
    
    const { featuredJournal, subHeadline, headline, title, blurb, ctaText, ctaLink } = props;

    return (
        <section className={styles.fullFeatureBlog}>
            <div key={featuredJournal.title} className={styles.fullFeatureBlogImage} style={{ backgroundImage: `url(${featuredJournal.featuredImage.node.mediaItemUrl})`}}>
                <div className={styles.top}>
                    <ThreePartHeading
                        subheader={subHeadline}
                        header={headline}
                        ctaText={ctaText}
                        ctaLink={ctaLink}
                        floatingBtn
                        white
                        shortTitle
                    />
                </div>
                <a href={featuredJournal.uri} className="pull-quote white">
                    <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_arrow-white.svg" alt="white arrow" className={styles.white_arrow}  /> {featuredJournal.title}
                </a>
            </div>
        </section>
    )
}