import { useEffect, useState } from "react";
import styles from "../styles/forms.module.css";
import styled from "styled-components";

const FormContentContainer = styled.div`
	max-width: 60vw;
	margin: 6rem auto;

	@media (max-width: 900px) {
		max-width: 70vw;
	}
	@media (max-width: 601px) {
		max-width: 80vw;
	}
`;

const EventForm = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
	margin-block: 3rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const FieldGroup = styled.div`
	display: flex;
	flex-direction: column;

	input,
	textarea {
		border: none;
		border-bottom: 1px solid black;
		padding-block: 0.75rem;
		border-radius: 0;
	}

	&.messageField {
		grid-column: 1/3;

		@media (max-width: 768px) {
			grid-column: 1/2;
		}
	}
`;
const SubmitButtonContainer = styled.div`
	grid-column: 1/3;
	display: grid;
	grid-template-columns: 2fr 1fr;
	@media (max-width: 768px) {
		grid-column: 1/2;
		grid-template-columns: 1fr;
	}
`;
const DisclaimerText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-right: 7rem;
	@media (max-width: 768px) {
		padding-right: 0;
	}
`;
const SubmitButton = styled.button`
	display: block;
	width: fit-content;
	float: right;
	color: var(--brown);
	background-color: transparent;
	border: 1px solid var(--brown);
	padding: 1.3rem 4.5rem;
	margin-block: 2.5rem;

	@media (max-width: 768px) {
		align-self: flex-end;
	}
`;
export default function Form(props) {
	const { type, subHeadline, headline, blurb, anchorTag } = props;

	const [firstname, setFirst] = useState("");
	const [lastname, setLast] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [startdate, setStart] = useState("");
	const [enddate, setEnd] = useState("");
	const [numOfGuests, setNumOfGuests] = useState("");
	const [numOfRooms, setNumOfRooms] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(
			"https://hooks.zapier.com/hooks/catch/2001353/bplvi15/",
			{
				method: "POST",
				body: JSON.stringify({
					email,
					firstname,
					lastname,
					phone,
					startdate,
					enddate,
					numOfGuests,
					numOfRooms,
					message,
				}),
			}
		);

		handleResponse(res);
	};

	const handleResponse = async (res) => {
		if (res.status === 200) {
			setSuccess(true);
			window.location.href = "/thank-you";
		}
	};

	const formStructure = (type) => {
		switch (type) {
			case "Event Booking":
				return (
					<EventForm
						id="emailcapture"
						action="https://hooks.zapier.com/hooks/catch/2001353/bplvi15/"
						onSubmit={handleSubmit}>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="firstname">
								First name *
							</label>
							<input
								required
								type="text"
								name="firstname"
								placeholder="First Name"
								value={firstname}
								onChange={(e) => setFirst(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="lastname">
								Last Name *
							</label>
							<input
								required
								type="text"
								name="lastname"
								placeholder="Last Name"
								value={lastname}
								onChange={(e) => setLast(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="phonenumber">
								Phone Number*
							</label>
							<input
								required
								type="text"
								name="phonenumber"
								placeholder="Your Number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="email">
								Email Address*
							</label>
							<input
								required
								type="email"
								name="email"
								placeholder="Your Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="startdate">
								Event Start Date*
							</label>
							<input
								required
								type="date"
								name="startdate"
								placeholder="Event Start Date"
								value={startdate}
								onChange={(e) => setStart(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="enddate">
								Event End Date*
							</label>
							<input
								required
								type="date"
								name="enddate"
								placeholder="Event End Date"
								value={enddate}
								onChange={(e) => setEnd(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="nguests">
								Number of Guests
							</label>
							<input
								required
								type="number"
								name="nguests"
								placeholder="Number of Guests"
								value={numOfGuests}
								onChange={(e) => setNumOfGuests(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="nroom">
								Number of Guest Rooms
							</label>
							<input
								required
								type="number"
								name="nrooms"
								placeholder="Number of Guest Rooms"
								value={numOfRooms}
								onChange={(e) => setNumOfRooms(e.target.value)}
							/>
						</FieldGroup>
						<FieldGroup className="messageField">
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="additionaldetails">
								Additional Details*
							</label>
							<textarea
								required
								name="additionaldetails"
								placeholder="Your Message"
								rows="4"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</FieldGroup>
						<SubmitButtonContainer>
							<DisclaimerText>
								<p className="sans-serif xs-copy black left">
									Venue reservation is exclusively available
									for Orli guests. As our event spaces overlap
									with property amenities, a two-night minimum
									is required. Site fees vary by seasons.
								</p>
							</DisclaimerText>
							<SubmitButton className="sans-serif xs-copy center uppercase">
								Submit
							</SubmitButton>
						</SubmitButtonContainer>
					</EventForm>
				);
			case "Contact Form":
				return <form className={styles.EventForm}></form>;
			default:
				return null;
		}
	};
	return (
		<section className="max-80">
			<FormContentContainer>
				{anchorTag && (
					<a id={anchorTag} name={anchorTag} className="anchor"></a>
				)}
				<p className="sans-serif sub-heading-bold black left">
					{subHeadline}
				</p>
				<h3 className="serif heading black left">{headline}</h3>
				<div
					className="sans-serif body-copy black left"
					dangerouslySetInnerHTML={{ __html: blurb }}></div>
				{formStructure(type)}
			</FormContentContainer>
		</section>
	);
}
