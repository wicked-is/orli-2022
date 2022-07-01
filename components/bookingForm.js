import { useState } from 'react';
import DatePicker from 'react-datepicker';

import Counter from './counter'

import "react-datepicker/dist/react-datepicker.css";

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const [counterValue, setCounterValue] = useState(1);

    return (
        <div className={styles.formcontainer}>
            <form className={styles.form} method="post" action="https://hotels.cloudbeds.com/reservation/uK87lN" target="_blank">
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    <DatePicker
                        selected={startDate}
                        placeholderText="Add Date"
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        name="widget_date"
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
                        placeholderText="Add Date"
                        minDate={startDate}
                        name="widget_date_to"
                    />
                </div>
                <button type="submit" className={`${styles.button} btn-submit xs-copy body-copy uppercase white bg-brown`}>Search</button>
            </form>
            <a className={`${styles.bookingtext} body-copy underline white`}>
                Book Multiple Rooms
            </a>
        </div>
    )
}