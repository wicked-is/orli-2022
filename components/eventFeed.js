import styles from '../styles/eventFeed.module.css'
import Link from 'next/link'

export default function EventFeed({ events }) {
    return (
        <>
            <article style={{ borderTop: '1px solid black' }}>
                <a href="" passHref>
                <p className="sans-serif xs-copy left">Event Category | 01 March 2022</p>
                <div className="flexcenter">
                    <div className="col-1-90">
                        <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
                    </div>
                    <div className="col-1-10">
                        <img className={styles.arrow} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg" alt="arrow"/>
                    </div>
                </div>
                </a>
            </article>
            <article style={{ borderTop: '1px solid black' }}>
                <a href="" passHref>
                <p className="sans-serif xs-copy left">Event Category | 01 March 2022</p>
                 <div className="flexcenter">
                    <div className="col-1-90">
                        <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
                    </div>
                    <div className="col-1-10">
                        <img className={styles.arrow} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg" alt="arrow"/>
                    </div>
                </div>
                </a>
            </article>
            <article style={{ borderTop: '1px solid black' }}>
                <a href="" passHref>
                <p className="sans-serif xs-copy left">Event Category | 01 March 2022</p>
                <div className="flexcenter">
                    <div className="col-1-90">
                         <h3 className="heading" style={{ margin: '0 0 1rem' }}>Wedding Reception<span className={styles.arrow}></span></h3>
                    </div>
                    <div className="col-1-10">
                            <img className={styles.arrow} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg" alt="arrow"/>
                    </div>
                </div>
                </a>
            </article>
        </>
    )
}