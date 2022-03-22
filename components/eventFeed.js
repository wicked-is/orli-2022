import styles from '../styles/eventFeed.module.css'

export default function EventFeed({ events }) {
    return (
        <>
            <article style={{ borderTop: '1px solid black' }}>
                <p>Event Category | 01 March 2022</p>
                <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
            </article>
            <article style={{ borderTop: '1px solid black' }}>
                <p>Event Category | 01 March 2022</p>
                <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
            </article>
            <article style={{ borderTop: '1px solid black' }}>
                <p>Event Category | 01 March 2022</p>
                <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
            </article>
        </>
    )
}