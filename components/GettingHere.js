import Image from 'next/image'
import styles from '../styles/GettingHere.module.css';

export default function GettingHere({title, blurb, gettinghereimage}) {

    return (
        <section className={styles.container}>
            <div className="max-80">
            {title && <p className="heading left">{title}</p>}
                {blurb && <p className="sans-serif body-copy black left" style={{ maxWidth: '60%'}}>{blurb}</p>}
            </div>
            {gettinghereimage && <img className={styles.ghimg} src={gettinghereimage.mediaItemUrl} alt={gettinghereimage.altText} />}
        </section>
    )
}