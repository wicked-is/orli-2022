import { useState } from 'react';
import DatePicker from 'react-datepicker';

import Counter from './counter'

import "react-datepicker/dist/react-datepicker.css";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from '../styles/bookingForm.module.css';

export default function BookingForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 72)));

    return (
            <form className={styles.form} >
                <div className="form-group">
                    <span>Check In</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className="form-group">
                    <span>Check Out</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <div className="form-group">
                    <span>Guests</span>
                    <Counter />
                </div>
                <button type="submit" className="btn-submit">Search</button>
            </form>
    )
}