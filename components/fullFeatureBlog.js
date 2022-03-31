import ThreePartHeading from './threePartHeading';
import styles from '../styles/fullFeatureBlog.module.css';

export default function FullFeatureBlog({ posts, title, blurb, ctaText, ctaLink }) {
    return (
        <section className={styles.fullFeatureBlog}>
        {
            posts.map((post, index) => {
                return (
                    <div key={post.title} className={styles.fullFeatureBlogImage} style={{ backgroundImage: `url(${post.featuredImage.node.sourceUrl})`}}>
                            <div className={styles.top}>
                            <ThreePartHeading
                             subheader={title}
                            header={blurb}
                            ctaText={ctaText}
                            ctaLink={ctaLink}
                            floatingBtn
                            white
                            shortTitle>
                            </ThreePartHeading>
                            </div>
                            <a href={post.slug} className="pull-quote white">
                                <img src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_arrow-white.svg" alt="white arrow" className={styles.white_arrow}  /> {post.title}
                    </a>
                     </div>
                )
            })
        }
        </section>
    )
}