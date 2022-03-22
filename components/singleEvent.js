export default function SingleEvent({ category, date, title }) {
    return (
        <article style={{ borderTop: '1px solid black' }}>
            <p>{category} | {date}</p>
            <h3 className="heading" style={{ margin: '0 0 1rem' }}>{title}<span className={styles.arrow}></span></h3>
        </article>
    )
}