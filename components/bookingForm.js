import { useState } from 'react';
import DatePicker from 'react-datepicker';

import Counter from './counter'

import "react-datepicker/dist/react-datepicker.css";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const [counterValue, setCounterValue] = useState(1);

    return (
            <form className={styles.form} >
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    <DatePicker
                        selected={startDate}
                        placeholderText="Add Dates"
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check Out</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Add Dates"
                        minDate={startDate}
                    />
                </div>
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Guests</span>
                    <Counter value={counterValue} updateCounter={setCounterValue} />
                </div>
                <button type="submit" className="btn-submit xs-copy uppercase white bg-brown">Search</button>
            </form>
    )
}