import styles from '../styles/threePartHeading.module.css';

export default function ThreePartHeading({ subheader, header, ctaText, ctaLink, shortTitle, floatingBtn }) {
    return (
        <div style={{position: 'relative' }}>
            {subheader && <p className="sub-heading-bold">{subheader}</p>}
            {header && <p className="heading" style={{ margin: 0, maxWidth: shortTitle ? '60%' : '',  }}>{header}</p>}
            {ctaLink && <p className={`xs-copy ${floatingBtn ? styles.floatingCTA : ''}`} style={{ textDecoration: 'underline' }}><a href={ctaLink}>{ctaText}</a></p>}
        </div>
    )
}