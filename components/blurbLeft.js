import Image from 'next/image'

import styles from '../styles/blurbLeft.module.css'

export default function BlurbLeft({ content, ctaLink, ctaText, icon, title }) {
    return (
        <div className={styles.blurbLeftContainer}>
            {icon && <div className={styles.icon}><Image src={icon} width={100} height={100} layout="fixed" /></div>}
            {title && <p className="sub-heading-bold">{title}</p>}
            {content && <p className={`${styles.content} heading`}>{content}</p>}
            {ctaLink && <p className={`${styles.cta} xs-copy`}><a href={ctaLink}>{ ctaText }</a></p>}
        </div>
    )
}