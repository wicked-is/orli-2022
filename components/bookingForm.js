import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Counter from './counter'
import Link from 'next/link';

import "react-datepicker/dist/react-datepicker.css";

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [checkOutDate, setCheckOutDate] = useState('');

    const setCheckout = (date) => {
        setCheckOutDate(date.target.value)
    }

    return (
        <div className={styles.formcontainer}>
            <form className={styles.form} method="POST" action="https://hotels.cloudbeds.com/reservation/L1Jxph" target="_blank">
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    {/* onFocus={() => setCheckInType('date')}  */}
                    <input type={"date"} name="widget_date" placeholder="mm/dd/yyyy" className="sans-serif" onChange={setCheckout} />
                </div>
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check Out</span>
                    {/* onFocus={() => setCheckOutType('date')}  */}
                    <input type={"date"} name="widget_date_to" placeholder="mm/dd/yyyy" className="sans-serif" value={checkOutDate} onChange={setCheckout} />
                </div>
                <button type="submit" className={`${styles.button} btn-submit xs-copy body-copy uppercase white bg-brown`}>Search</button>
            </form>
        </div>
    )
}