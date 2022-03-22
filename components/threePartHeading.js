import styles from '../styles/threePartHeading.module.css';

export default function ThreePartHeading({ subheader, header, ctaText, ctaLink, shortTitle, floatingBtn, white }) {
    return (
        <div style={{position: 'relative' }}>
            {subheader && <p className={`sub-heading-bold ${white && 'white'}`}>{subheader}</p>}
            {header && <p className={`heading ${white && 'white'}`} style={{ margin: 0, maxWidth: shortTitle ? '60%' : '',  }}>{header}</p>}
            {ctaLink && <p className={`xs-copy ${floatingBtn ? styles.floatingCTA : ''}`} style={{ textDecoration: 'underline' }}><a className={`${white && 'white'}`}href={ctaLink}>{ctaText}</a></p>}
        </div>
    )
}