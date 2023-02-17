import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Counter from './counter'
import Link from 'next/link';

import "react-datepicker/dist/react-datepicker.css";

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [checkOutDate, setCheckOutDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');

    const setCheckin = (date) => {
        date.target.placeholder = ""
        setCheckInDate(date.target.value)
        setCheckOutDate(date.target.value)
    }
    const setCheckout = (date) => {
        date.target.placeholder = ""
        setCheckOutDate(date.target.value)
    }

    return (
        <div className={styles.formcontainer}>
            <form className={styles.form} method="POST" action={`https://hotels.cloudbeds.com/reservation/L1Jxph#checkin=${checkInDate}&checkout=${checkOutDate}`} target="_blank">
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    <input type={"date"} aria-label="Check In Date" name="widget_date" placeholder="mm/dd/yyyy" className="sans-serif" onChange={setCheckin} value={checkInDate} />
                </div>
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check Out</span>
                    <input type={"date"} aria-label="Check Out Date" name="widget_date_to" placeholder="mm/dd/yyyy" className="sans-serif" value={checkOutDate} onChange={setCheckout} />
                </div>
                <button type="submit" aria-label="search button" className={`${styles.button} btn-submit xs-copy body-copy uppercase white bg-brown`}>Search</button>
            </form>
        </div>
    )
}