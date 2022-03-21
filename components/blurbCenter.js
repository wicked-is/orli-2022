import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter({ content, icon }) {
    return (
        <section className={styles.blurbContainer}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="copy text-center">
                        <div className="icon">
                            <img src={icon} alt="Shell icon" />
                        </div>
                        <p className="large">
                            { content }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}