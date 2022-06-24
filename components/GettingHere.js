import Image from 'next/image'
import styles from '../styles/GettingHere.module.css';

import styled from 'styled-components';

const BlurbContainer = styled.p`
    max-width: 60%;

    @media screen and (max-width: 800px) {
        max-width: 100%;
    }
`

export default function GettingHere({title, blurb, gettinghereimage}) {

    return (
        <section className={styles.container}>
            <div className="max-80">
            {title && <p className="heading left">{title}</p>}
                {blurb && <BlurbContainer className="sans-serif body-copy black left">{blurb}</BlurbContainer>}
            </div>
            {gettinghereimage && <img className={styles.ghimg} src={gettinghereimage.mediaItemUrl} alt={gettinghereimage.altText} />}
        </section>
    )
}