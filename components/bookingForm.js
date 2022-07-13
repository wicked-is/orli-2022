import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Counter from './counter'

import "react-datepicker/dist/react-datepicker.css";

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [checkInType, setCheckInType] = useState('text');
    const [checkOutType, setCheckOutType] = useState('text');

    return (
        <div className={styles.formcontainer}>
            <form className={styles.form} method="post" action="https://hotels.cloudbeds.com/reservation/L1Jxph" target="_blank">
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check In</span>
                    <input type={checkInType} onFocus={() => setCheckInType('date')} name="widget_date" placeholder="Add Dates" className="sans-serif"/>
                </div>
                <div className={styles.formGroup}>
                    <span className="sans-serif xs-copy">Check Out</span>
                    <input type={checkOutType} name="widget_date_to" placeholder="Add Dates" onFocus={() => setCheckOutType('date')} className="sans-serif"/>
                </div>
                <button type="submit" className={`${styles.button} btn-submit xs-copy body-copy uppercase white bg-brown`}>Search</button>
            </form>
            <a href="/book-a-room/" className={`${styles.bookingtext} sans-serif xs-copy underline white`}>
                Book Multiple Rooms
            </a>
        </div>
    )
}