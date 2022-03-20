import ThreePartHeading from './threePartHeading';
import styles from '../styles/fullFeatureBlog.module.css';

export default function FullFeatureBlog({ title, blurb, ctaText, ctaLink, image, articleTitle, articleLink }) {
    return (
        <section className={styles.fullFeaturedBlog} >
            <div className={styles.bgImage} style={{ backgroundImage: `url(${image})`}}>
                <ThreePartHeading
                    subheader={title}
                    header={blurb}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                    topRightCTA />
                <a href={articleLink}>{articleTitle}</a>
            </div>
        </section>
    )
}