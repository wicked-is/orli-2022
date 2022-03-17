import styles from 'topBar.module.css'

export default function TopBar({ content, ctaText, ctaLink }) {
    return (
        <section className={styles.topBar}>
            <p>{content}</p>
            {ctaLink && (
                <a href={ctaLink}>{ ctaText}</a>
            )}
        </section>
    )
}   