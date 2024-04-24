/* eslint-disable react/no-unescaped-entities */

import styles from "../styles/eventFeed.module.css";
import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from "react";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const EventFeedContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3rem;

	padding-block: ${(props) => (props.fullWidget ? "6rem" : "0")};
	background-color: ${(props) =>
		props.fullWidget ? "var(--lt-grey)" : "white"};

	article:first-of-type {
		margin-top: ${(props) => (props.fullWidget ? "0" : "2rem")};
	}
	article:last-of-type {
		border-bottom: 1px solid var(--black);
	}

	article p {
		line-height: 1;
	}

	article h3 {
		line-height: 1;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding-inline: ${(props) => (props.fullWidget ? "10%" : "0")};
		margin-inline: auto;
	}
`;
const Left = styled.div`
	flex: 1.2;
	overflow: scroll;
	margin-left: 0;
	padding-left: ${(props) => (props.fullWidget ? "10%" : "0")};

	@media (max-width: 768px) {
		margin-left: 0;
		padding-left: 0;
	}
`;
const Right = styled.div`
	flex: 2;
`;
const HeadContainer = styled.div`
	min-height: 325px;
	background-size: cover;
	background-position: center;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	p {
		margin-left: 3.5rem;

		&:last-of-type {
			margin-bottom: 1.5rem;
		}
	}

	@media screen and (max-width: 500px) {
		min-height: 115px;
	}
`;
const ContentContainer = styled.div`
	margin-right: 10vw;
	margin-left: 3.5rem;

	div:first-of-type {
		display: flex;
		flex-direction: row;
		gap: 2rem;

		@media screen and (max-width: 800px) {
			flex-direction: column;
			gap: 0;

			p {
				margin-bottom: 1rem;
			}
		}
	}

	@media screen and (max-width: 800px) {
		margin-inline: 0;
	}
`;
const RSVPLink = styled.a`
	display: block;
	width: fit-content;
	color: var(--brown);
	border: 1px solid var(--brown);
	padding: 1.4rem 4.5rem;
	margin-block: 2.5rem;
`;
const CalendarLinkContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3rem;

	@media screen and (max-width: 991px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
const CalendarLink = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	&:first-of-type::before {
		content: "";
		margin-right: 0.5rem;
		display: block;
		width: 20px;
		height: 21px;
		background-image: url("https://orlidev.wpengine.com/wp-content/uploads/2022/06/google-logo-white.png");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}
	&:last-of-type::before {
		content: "";
		margin-right: 0.5rem;
		display: block;
		width: 20px;
		height: 25px;
		background-image: url("https://orlidev.wpengine.com/wp-content/uploads/2022/06/Apple_logo_black-1.png");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}
`;

export default function EventFeed(props) {
	const { events, fullWidget } = props;

	const [currentEvent, setCurrentEvent] = useState({
		category: "",
		image: "",
	});

	const [dimensions, setDimensions] = useState({
		height: null,
		width: null,
	});
	const [isMobile, setIsMobile] = useState(false);

	// useEffect(() => {
	// 	function handleResize() {
	// 		setDimensions({
	// 			height: window.innerHeight,
	// 			width: window.innerWidth,
	// 		});

	// 		if (window.innerWidth < 768) {
	// 			setIsMobile(true);
	// 		} else {
	// 			setIsMobile(false);
	// 		}
	// 	}

	// 	window.addEventListener("resize", handleResize);

	// 	return (_) => {
	// 		window.removeEventListener("resize", handleResize);
	// 	};
	// });

	useEffect(() => {
		const passedEvent = new URLSearchParams(window.location.search).get(
			"event"
		);
		// console.log(passedEvent);

		if (props.fullWidget && passedEvent === null) {
			setCurrentEvent({
				title: events[0].title,
				description: events[0].singleEvent.description,
				rsvp: events[0].singleEvent.rsvpLink,
				rsvpText: events[0].singleEvent.rsvpText,
				category: events[0]?.categories?.nodes[0]?.name,
				image: events[0]?.featuredImage?.node?.mediaItemUrl,
				date: events[0].singleEvent.date,
				time: events[0].singleEvent.time,
				address: events[0].singleEvent.address,
				gcal: events[0].singleEvent.gcal,
				acal: events[0].singleEvent.acal,
				locationname: events[0].singleEvent.locationName,
			});

			document.querySelectorAll(".event-tile").forEach((el) => {
				el.addEventListener("mouseenter", (event) => {
					event.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
				});
				el.addEventListener("touchend", (event) => {
					event.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
				});
			});

			// for every event tile  click scroll to the bottom of the container
			document.querySelectorAll(".event-tile").forEach((el) => {
				el.addEventListener("touchend", (e) => {
					e.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
					// document.querySelector(".main-content").scrollIntoView({
					// 	behavior: `smooth`,
					// });
				});
			});
		} else if (props.fullWidget && passedEvent !== null) {
			const eventToSet = events.filter(
				(event) =>
					event.title
						.toLowerCase()
						.replace(/[^a-zA-Z0-9 ]/g, "")
						.replaceAll(" ", "-")
						.replace("--", "-") === passedEvent
			)[0];

			// console.log("event: ", eventToSet);

			setCurrentEvent({
				title: eventToSet.title,
				description: eventToSet.singleEvent.description,
				rsvp: eventToSet.singleEvent.rsvpLink,
				rsvpText: eventToSet.singleEvent.rsvpText,
				category: eventToSet?.categories?.nodes[0]?.name,
				image: eventToSet?.featuredImage?.node?.mediaItemUrl,
				date: eventToSet.singleEvent.date,
				time: eventToSet.singleEvent.time,
				address: eventToSet.singleEvent.address,
				gcal: eventToSet.singleEvent.gcal,
				acal: eventToSet.singleEvent.acal,
				locationname: eventToSet.singleEvent.locationName,
			});

			document.querySelectorAll(".event-tile").forEach((el) => {
				el.addEventListener("mouseenter", (event) => {
					event.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
				});
				el.addEventListener("touchend", (event) => {
					event.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
				});
			});

			// for every event tile  click scroll to the bottom of the container
			document.querySelectorAll(".event-tile").forEach((el) => {
				el.addEventListener("touchend", (e) => {
					e.preventDefault();
					setCurrentEvent({
						title: el.dataset.title,
						description: el.dataset.description,
						category: el.dataset.category,
						image: el.dataset.image,
						date: el.dataset.date,
						rsvp: el.dataset.rsvp,
						rsvpText: el.dataset.rsvptext,
						time: el.dataset.time,
						address: el.dataset.address,
						gcal: el.dataset.gcal,
						acal: el.dataset.acal,
						locationname: el.dataset.locationName,
					});
					// document.querySelector(".main-content").scrollIntoView({
					// 	behavior: `smooth`,
					// });
				});
			});
		}
	}, []);

	return events == null ? null : (
		<EventFeedContainer
			fullWidget={fullWidget}
			className={props.fullWidget ? "fullWidget" : ""}>
			<a id="upcoming" name="upcoming" className="anchor"></a>
			<Left fullWidget={fullWidget}>
				{fullWidget && (
					<p className="sans-serif-bold sub-heading mt-0">Upcoming</p>
				)}
				{events.map((event, index) => {
					if (fullWidget) {
						const date = new Date(event.date);
						let day = date.getDate();
						let month = months[date.getMonth()];
						let year = date.getFullYear();
					}

					return (
						<article
							key={`event-${index}`}
							className={`${
								index == 0
									? `${styles.first} event-tile`
									: `event-tile`
							}`}
							style={{
								borderTop: "1px solid black",
								width: "100%",
							}}
							data-category={event?.categories?.nodes[0]?.name}
							data-title={event?.title}
							data-image={event?.featuredImage?.node.mediaItemUrl}
							data-date={event?.singleEvent?.date}
							data-rsvp={event?.singleEvent?.rsvpLink}
							data-rsvptext={event?.singleEvent?.rsvpText}
							data-time={event?.singleEvent?.time}
							data-gcal={
								event?.singleEvent?.addToGoogleCalendarLink
							}
							data-acal={
								event?.singleEvent?.addToAppleCalendarLink
							}
							data-address={event?.singleEvent?.address}
							data-description={event?.singleEvent?.description}
							data-locationname={
								event?.singleEvent?.locationName
							}>
							{props.fullWidget && !isMobile ? (
								<div>
									<p className="sans-serif xs-copy left">
										{event.singleEvent.locationName} |{" "}
										{event.singleEvent.date}
									</p>
									<div
										className="flexcenter-a"
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}>
										<div className="col-1-90-a">
											<h3
												className="heading"
												style={{ margin: "0 0 1rem" }}>
												{event.title}
												<span
													className={
														styles.arrow
													}></span>
											</h3>
										</div>
										{!props.fullWidget && (
											<div
												className="col-1-10-a"
												style={{ maxWidth: "50px" }}>
												<img
													className={styles.arrow}
													src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg"
													alt="arrow"
												/>
											</div>
										)}
									</div>
								</div>
							) : (
								<Link href={event.link} passHref>
									<a>
										<p className="sans-serif xs-copy left">
											{event?.singleEvent?.locationName &&
												`${event.singleEvent.locationName} | `}
											{event?.singleEvent?.date ||
												event.date}
										</p>
										<div
											className="flexcenter-a"
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}>
											<div className="col-1-90-a">
												<h3
													className="heading"
													style={{
														margin: "0 0 1rem",
													}}>
													{event.title}
													<span
														className={
															styles.arrow
														}></span>
												</h3>
											</div>
											{!props.fullWidget && (
												<div
													className="col-1-10-a"
													style={{
														maxWidth: "50px",
													}}>
													<img
														className={styles.arrow}
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg"
														alt="arrow"
													/>
												</div>
											)}
										</div>
									</a>
								</Link>
							)}
						</article>
					);
				})}
			</Left>
			{props.fullWidget && (
				<Right className="main-content">
					<HeadContainer
						style={{
							background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3)), url(${
								currentEvent.image ? currentEvent.image : ""
							}) no-repeat center / cover`,
							backgroundSize: "cover",
						}}>
						<p className="white sans-serif body-copy mb-0">
							{currentEvent.category ? currentEvent.category : ""}
						</p>
						<p className="heading white serif">
							{currentEvent.title}
						</p>
					</HeadContainer>
					<ContentContainer>
						<div className="sans-serif body-copy black left">
							<p
								dangerouslySetInnerHTML={{
									__html: `${currentEvent.date} ${
										currentEvent.time &&
										` <br /> ${currentEvent.time}`
									}`,
								}}></p>
							<p
								dangerouslySetInnerHTML={{
									__html: currentEvent.address,
								}}></p>
						</div>
						<p
							className="mt-0 sans-serif body-copy black left"
							dangerouslySetInnerHTML={{
								__html: currentEvent.description,
							}}></p>
						{currentEvent.rsvp ? (
							<RSVPLink
								href={currentEvent.rsvp}
								target={
									currentEvent?.rsvp?.includes(
										"stayorli.com"
									) &&
									!currentEvent?.rsvp?.includes(
										"shop.stayorli.com"
									)
										? null
										: "_blank"
								}>
								{currentEvent?.rsvpText
									? currentEvent?.rsvpText
									: "Learn More"}
							</RSVPLink>
						) : null}
						<CalendarLinkContainer>
							<CalendarLink
								className="sans-serif xs-copy black left underline"
								href={currentEvent.gcal}
								target="_blank">
								Add to Google Calendar
							</CalendarLink>
							<CalendarLink
								className="sans-serif xs-copy black left underline"
								href={currentEvent.acal}
								target="_blank">
								Add to Apple Calendar
							</CalendarLink>
						</CalendarLinkContainer>
					</ContentContainer>
				</Right>
			)}
		</EventFeedContainer>
	);
}
