import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter({ content, icon }) {
    return (
        <section className={styles.blurbContainer}>
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="copy text-center">
                        <div class="icon">
                            <img src={icon} alt="Shell icon" />
                        </div>
                        <p class="large">
                            { content }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}