import styles from '../styles/threePartHeading.module.css';

export default function ThreePartHeading({ subheader, header, ctaText, ctaLink, shortTitle, floatingBtn, white }) {

    return (
        <div style={{position: 'relative', marginBottom: '3rem' }}>
            {subheader && <p className={`sans-serif-bold sub-heading ${white && 'white'}`}>{subheader}</p>}
            {header && <p className={`heading ${white && 'white'} ${styles.shorttitle}`}>{header}</p>}
            {ctaLink && <p className={`sans-serif xs-copy ${floatingBtn ? styles.floatingCTA : ''}`} style={{ textDecoration: 'underline' }}><a className={`${white && 'white'}`}href={ctaLink}>{ctaText}</a></p>}
        </div>
    )
}