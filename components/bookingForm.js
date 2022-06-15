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
        <>
            <form className={styles.form} method="post" action="https://hotels.cloudbeds.com/reservation/uK87lN" target="_blank">
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    <DatePicker
                        selected={startDate}
                        placeholderText="Add Dates"
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
                        placeholderText="Add Dates"
                        minDate={startDate}
                        name="widget_date_to"
                    />
                </div>
                <button type="submit" className="btn-submit xs-copy uppercase white bg-brown">Search</button>
            </form>
            <a className="xs-copy body-copy underline white" style={{ position: 'absolute', bottom: '-40px', left: 0 }}>
                Book Multiple Rooms
            </a>
        </>
    )
}