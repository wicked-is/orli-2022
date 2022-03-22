import styles from '../styles/blurbCenter.module.css';

export default function BlurbCenter({ content, icon, greyBG, altText }) {
    return (
        <section className={`${styles.blurbContainer} ${greyBG && 'bg-lt-grey'}`}>
            <div className="max-75 center">
                <div className={`${styles.icon}`}>
                    <img src={icon} alt="Shell icon" altText={altText}/>
                </div>
                <p className="heading-italic">
                    { content }
                </p>
            </div>
        </section>
    )
}