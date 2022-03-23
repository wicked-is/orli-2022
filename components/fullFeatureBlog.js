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
                    white
                    shortTitle />
            </div>
            <a href={articleLink} className="heading-italic white">
                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_arrow-white.svg" alt="white arrow" className={styles.white_arrow}  /> {articleTitle}
            </a>
        </section>
    )
}