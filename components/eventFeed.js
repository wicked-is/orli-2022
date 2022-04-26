import styles from '../styles/eventFeed.module.css'
import Link from 'next/link'

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function EventFeed({ events }) {
    return (
        <>
            {
                events.map((event, index) => {
                    
                    const date = new Date(event.date);
                    let day = date.getDate();
                    let month = months[date.getMonth()];
                    let year = date.getFullYear();
                    
                    return (
                        <article key={`event-${index}`} className={index == 0 ? styles.first : ''} style={{ borderTop: '1px solid black' }}>
                            <a href="#">
                                <p className="sans-serif xs-copy left">{event.categories.nodes[0].name} | {day} {month} {year}</p>
                                <div className="flexcenter">
                                    <div className="col-1-90">
                                        <h3 className="heading" style={{ margin: '0 0 1rem' }}>{event.title}<span className={styles.arrow}></span></h3>
                                    </div>
                                    <div className="col-1-10">
                                        <img className={styles.arrow} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg" alt="arrow"/>
                                    </div>
                                </div>
                            </a>
                        </article>
                    )
                }
            )}
        </>
    )
}