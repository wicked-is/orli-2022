import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter({ content, icon }) {
    return (
        <section className={styles.blurbContainer}>
            <div className="max-75 center">
                <div className="icon">
                    <img src={icon} alt="Shell icon" />
                </div>
                <p className="heading italic">
                    { content }
                </p>
            </div>
        </section>
    )
}