import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";

const ContainerAndOverlay = styled.section`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

	display: grid;
	place-items: center;
	z-index: 999999999;
`;

export default function CalendarWidget(props) {
	function handleDateChange(value, event) {
		console.log({ value, event });
		props.handleCheckin(value[0]);
		props.handleCheckout(value[1]);
	}

	return (
		<ContainerAndOverlay onFocus={props.closeCalendarWidget}>
			<Calendar
				selectRange={true}
				returnValue="range"
				onChange={handleDateChange}
				showDoubleView={true}
			/>
		</ContainerAndOverlay>
	);
}
