import { useState } from 'react';
import DatePicker from 'react-datepicker';

import Counter from './counter'

import "react-datepicker/dist/react-datepicker.css";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function BookingForm() {
    const [startDate, setStartDate] = useState(new Date());
    consot [endDate, setEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 72)));

    return (
        <article>
            <form>
                <div className="form-group">
                    Check In
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className="form-group">
                    Check Out
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
                    Guests
                    <Counter />
                </div>
                <button type="submit" className="btn-submit">Search</button>
            </form>
        </article>
    )
}