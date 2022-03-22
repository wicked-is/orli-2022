import styles from '../styles/counter.module.css';

export default function Counter({ value, updateCounter }) {
    const handleIncrease = () => updateCounter(value + 1);
    const handleDecrease = () => {
        if (value > 0) {
            updateCounter(value - 1);
        }
    };

    return (
        <div className={styles.counterContainer}>
            <a onClick={handleDecrease} style={{ margin: '0 1rem 0 0'}}>-</a>
                {value}
            <a onClick={handleIncrease} style={{ margin: '0 1rem'}}>+</a>
        </div>
    )
}