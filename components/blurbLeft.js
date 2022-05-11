import Image from 'next/image'

import styles from '../styles/blurbLeft.module.css'

export default function BlurbLeft({ content, ctaLink, ctaText, icon, title }) {
    return (
        <div className={styles.blurbLeftContainer}>
            {icon && <div className={styles.icon}><Image src={icon.mediaItemUrl} width={100} height={100} layout="fixed" alt={icon.altText} /></div>}
            {title && <p className={`${styles.mobilepadding} sans-serif-bold sub-heading`}>{title}</p>}
            {content && <p className={`${styles.content} heading`}>{content}</p>}
            {ctaLink && <p className={`${styles.cta} sans-serif xs-copy`}><a href={ctaLink}>{ ctaText }</a></p>}
        </div>
    )
}