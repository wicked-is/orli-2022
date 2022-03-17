import styles from '../styles/counter.module.css';

export default function Counter({ value, updateCounter }) {
    const handleIncrease = () => updateCounter(value + 1);
    const handleDecrease = () => updateCounter(value - 1);

    return (
        <div className={styles.counterContainer}>
            <a>-</a>
                {value}
            <a>+</a>
        </div>
    )
}