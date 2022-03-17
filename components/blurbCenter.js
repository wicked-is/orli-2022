import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter({ content, icon, title }) {
    return (
        <article className={styles.blurbContainer}>
            { icon && <Image src={icon} width={100} height={100} /> }
            {title && <h2>{title}</h2>}
            <p>{content}</p>
        </article>
    )
}