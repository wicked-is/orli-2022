import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Counter from "./counter";
import Link from "next/link";

// import "react-datepicker/dist/react-datepicker.css";

import styles from "../styles/bookingForm.module.css";
import "react-calendar/dist/Calendar.css";
import CalendarWidget from "./CalendarWidget";
import LoadingSpinner from "./LoadingSpinner";

export default function BookingForm(props) {
	const { isQuickView, closeDialog, roomId } = props;
	const [checkOutDate, setCheckOutDate] = useState("");
	const [checkInDate, setCheckInDate] = useState("");
	const [calendarIsVisible, setcalendarIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const checkInRef = useRef(null);
	const checkOutRef = useRef(null);

	const setCheckin = (date) => {
		checkInRef.current.setAttribute("placeholder", "");
		checkInRef.current.value = date.toISOString().split("T")[0];
		// setCheckInDate(date.toISOString().split("T")[0]);
		setCheckInDate(
			new Date(Date.parse(date)).toLocaleDateString("fr-CA", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
		);
	};
	const setCheckout = (date) => {
		checkOutRef.current.setAttribute("placeholder", "");
		checkOutRef.current.value = date.toISOString().split("T")[0];
		setCheckOutDate(
			new Date(Date.parse(date)).toLocaleDateString("fr-CA", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
		);

		setTimeout(() => {
			toggleLoading();
			toggleShowCalendar();
			handleFormSubmit();
		}, 500);
	};

	function toggleShowCalendar(e) {
		if (e) e.preventDefault();
		setcalendarIsVisible(!calendarIsVisible);
	}

	function toggleLoading() {
		setIsLoading(true);
	}

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
	}, [isLoading]);

	function handleFormFocus(e) {
		e.preventDefault();
		if (props.closeDialog) closeDialog();
		window.openBookingFlow();
	}

	function handleFormSubmit(e) {
		if (e) e.preventDefault();

		Mews.Distributor(
			{
				// This is the demo id
				configurationIds: ["e12243c4-2c54-4d1c-a958-afb801279497"],
				// This is the id from the Mews General Settings of the dashboard
				// configurationIds: ["b6f6f212-71c7-4e05-897a-afb801278392"],
				// This is the id from the Mews Booking Engines Settings of the dashboard
				// configurationIds: ["e12243c4-2c54-4d1c-a958-afb801279497"],
				openElements: ".distributor-open",
			},
			function (api) {
				// you can call API functions on a booking engine instance here
				// set different start and end date
				api.setStartDate(
					new Date(checkInRef.current.value.replace(/-/g, "/"))
				);
				api.setEndDate(
					new Date(checkOutRef.current.value.replace(/-/g, "/"))
				);

				if (isQuickView) closeDialog();
				if (roomId?.length > 0) api.showRates(roomId);
				api.open();
			}
		);
	}

	return (
		<div
			// onFocus={() => console.log("focused")}
			onFocus={handleFormFocus}
			id="booking-form"
			style={{
				background: "transparent !important",
				width: "100%",
				marginBottom: isQuickView ? "0" : "115px",
				alignSelf: "flex-end",
			}}>
			{calendarIsVisible ? (
				<CalendarWidget
					handleCheckin={setCheckin}
					handleCheckout={setCheckout}
					closeCalendarWidget={toggleShowCalendar}
				/>
			) : null}
			<div className={styles.formcontainer}>
				<form
					// action={`https://app.mews.com/distributor/b6f6f212-71c7-4e05-897a-afb801278392?mewsStart=${checkInDate}&mewsEnd=${checkOutDate}`}
					className={styles.form}
					method="POST"
					// onSubmit={handleFormSubmit}
				>
					<div className={styles.formGroup}>
						<span className="sans-serif xs-copy">Check In</span>
						<input
							type={"date"}
							aria-label="Check In Date"
							name="widget_date"
							placeholder="mm/dd/yyyy"
							className="sans-serif"
							// onChange={setCheckin}
							// onTouchEnd={(e) => {
							// 	e.preventDefault();
							// 	toggleShowCalendar();
							// }}
							// onClick={toggleShowCalendar}
							value={checkInDate}
							ref={checkInRef}
						/>
					</div>
					<div className={styles.formGroup}>
						<span className="sans-serif xs-copy">Check Out</span>
						<input
							type={"date"}
							aria-label="Check Out Date"
							name="widget_date_to"
							placeholder="mm/dd/yyyy"
							className="sans-serif"
							value={checkOutDate}
							// onTouchEnd={(e) => {
							// 	e.preventDefault();
							// 	toggleShowCalendar();
							// }}
							// onChange={setCheckout}
							// onClick={toggleShowCalendar}
							ref={checkOutRef}
						/>
					</div>
					<button
						type="submit"
						aria-label="search button"
						className={`${styles.button} btn-submit xs-copy body-copy uppercase white bg-brown distributor-open`}>
						{isLoading ? <LoadingSpinner /> : "Search"}
					</button>
				</form>
			</div>
		</div>
	);
}
