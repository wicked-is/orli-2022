import ThreePartHeading from './threePartHeading';
import styles from '../styles/fullFeatureBlog.module.css';

export default function FullFeatureBlog({ title, blurb, ctaText, ctaLink, image, articleTitle, articleLink }) {
    return (
        <section className={styles.fullFeatureBlog} style={{ backgroundImage: `url(${image})`}}>
            <div className={styles.top}>
                <ThreePartHeading
                    subheader={title}
                    header={blurb}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                    floatingBtn
                    shortTitle />
            </div>
            <a href={articleLink} className="heading white">{articleTitle}</a>
        </section>
    )
}