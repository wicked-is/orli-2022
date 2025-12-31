import { useState } from "react";
import styled from "styled-components";
import styles from "../styles/forms.module.css";

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
	grid-template-columns: 50% 50%;
	grid-gap: 2rem;
	margin-block: 3rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
const ThreeColumn = styled.div``;
const InfluencerInquiryForm = styled(EventForm)`
	${ThreeColumn} {
		grid-column: span 2;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			grid-column: span 1;
		}
	}
`;
const EventVendoryInquiryForm = styled(EventForm)``;

const FieldGroup = styled.div`
	display: flex;
	flex-direction: column;

	grid-column: ${(props) => (props.$span ? `span ${props.$span}` : "span 1")};

	@media screen and (max-width: 768px) {
		grid-column: span 1;
	}

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
	justify-content: ${(props) => (props.wide ? "flex-start" : "center")};
	padding-right: ${(props) => (props.wide ? "0" : "7rem")};
	@media (max-width: 768px) {
		padding-right: 0;
	}

	p {
		margin-top: ${(props) => (props.wide ? "0" : "initial")};
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
	cursor: pointer;

	@media (max-width: 768px) {
		align-self: flex-end;
	}
`;
const StyledCheckboxContainer = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	margin-block: 1rem;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:hover input ~ span {
		background-color: #8c361e;
	}

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	span.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		border-radius: 50%;
		background-color: #d9d9d9;
	}
	input:checked ~ span.checkmark {
		background-color: #8c361e;
	}

	span.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}
	input:checked ~ span.checkmark:after {
		display: block;
	}
	span.checkmark:after {
		top: 6px;
		left: 6px;
		width: 12.5px;
		height: 12.5px;
		border-radius: 90%;
		background: #8c361e;
	}
`;
const CheckboxesContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 0;
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
	const [pastCollaborations, setPastCollaborations] = useState("");
	const [mediaKitFile, setMediaKitFile] = useState(null);
	const [raffles, setRaffles] = useState("");
	const [website, setWebsite] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [goodsOrServices, setGoodsOrServices] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e, type) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		let webHookUrl;
		switch (type) {
			case "Event Vendor Inquiry":
				webHookUrl =
					"https://hooks.zapier.com/hooks/catch/2001353/376eb76/";
				break;
			case "Influencer Inquiry":
				webHookUrl =
					"https://hooks.zapier.com/hooks/catch/2001353/37611qg/";
				break;
			case "Event Booking":
			default:
				webHookUrl =
					"https://hooks.zapier.com/hooks/catch/2001353/bplvi15/";
		}

		const res = await fetch(webHookUrl, {
			method: "POST",
			body: formData,
		});

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
						onSubmit={(e) => handleSubmit(e, type)}>
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
			case "Influencer Inquiry":
				return (
					<InfluencerInquiryForm
						id="influencer-inquiry"
						action=""
						onSubmit={(e) => handleSubmit(e, type)}>
						{/* First name  */}
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

						{/* Last name  */}
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

						{/* Email  */}
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

						{/* IG Audience  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="igAudience">
								Instagram Audience Demographic*
							</label>
							<input
								type="text"
								name="igAudience"
								placeholder="Instagram Audience Demographic"
								required={true}
							/>
						</FieldGroup>

						{/* Instagram  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="instagram">
								Instagram Profile
							</label>
							<input
								type="text"
								name="instagram"
								placeholder="Instagram Profile"
							/>
						</FieldGroup>

						{/* Facebook  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="facebook">
								Facebook Profile
							</label>
							<input
								type="text"
								name="facebook"
								placeholder="Facebook Profile"
							/>
						</FieldGroup>

						{/* TikTok  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="tiktok">
								TikTok Profile
							</label>
							<input
								type="text"
								name="tiktok"
								placeholder="TikTok Profile"
							/>
						</FieldGroup>

						{/* Website  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="website">
								Website
							</label>
							<input type="text" name="website" placeholder="" />
						</FieldGroup>

						<ThreeColumn>
							{/* Preferred Date of Arrival  */}
							<FieldGroup>
								<label
									className="sans-serif sub-heading-bold black"
									htmlFor="startdate">
									Proposed Arrival Date
								</label>
								<input
									required
									type="date"
									name="startdate"
									placeholder="Preferred Date of Stay"
									value={startdate}
									onChange={(e) => setStart(e.target.value)}
								/>
							</FieldGroup>

							{/* Date of Departure  */}
							<FieldGroup>
								<label
									className="sans-serif sub-heading-bold black"
									htmlFor="enddate">
									Proposed Departure Date
								</label>
								<input
									required
									type="date"
									name="enddate"
									placeholder="Departure Date"
									value={enddate}
									onChange={(e) => setEnd(e.target.value)}
								/>
							</FieldGroup>

							{/** Flexible - checkbox with yes or no as options */}
							<FieldGroup>
								<label
									className="sans-serif sub-heading-bold black"
									htmlFor="flexible">
									Flexible
								</label>
								<CheckboxesContainer>
									<StyledCheckboxContainer>
										<input
											type="checkbox"
											name="flexible"
											value="yes"
										/>
										<span className="checkmark"></span>
										Yes
									</StyledCheckboxContainer>
									<StyledCheckboxContainer>
										<input
											type="checkbox"
											name="flexible"
											value="no"
										/>
										<span className="checkmark"></span>
										No
									</StyledCheckboxContainer>
								</CheckboxesContainer>
							</FieldGroup>
						</ThreeColumn>

						{/* Areas of focus - check all that aplpy - F & B, Fashion, Travel, Beauty, Photography, Other  */}
						<FieldGroup $span={2}>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="focus">
								Areas of Focus
							</label>
							<CheckboxesContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="f&b"
									/>
									<span className="checkmark"></span>
									Food & Beverage
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="fashion"
									/>
									<span className="checkmark"></span>
									Fashion
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="travel"
									/>
									<span className="checkmark"></span>
									Travel
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="beauty"
									/>
									<span className="checkmark"></span>
									Beauty
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="photography"
									/>
									<span className="checkmark"></span>
									Photography
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="focus"
										value="other"
									/>
									<span className="checkmark"></span>
									Other
								</StyledCheckboxContainer>
							</CheckboxesContainer>
						</FieldGroup>

						{/* If other  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="other">
								If area of focus is other, please specify
							</label>
							<input type="text" name="other" placeholder="" />
						</FieldGroup>

						{/* Proposed Deliverables  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="deliverables">
								Proposed Deliverables
							</label>
							<input
								type="text"
								name="deliverables"
								placeholder=""
							/>
						</FieldGroup>

						{/* Examples of Past Collaborations  */}
						<FieldGroup className="messageField">
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="pastpartnerships">
								Sample of past partnerships*
							</label>
							<textarea
								required
								name="pastpartnerships"
								placeholder="Your Message"
								rows="4"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</FieldGroup>

						{/* Why Us  */}
						<FieldGroup className="messageField">
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="whyus">
								Why Us?
							</label>
							<textarea
								required
								name="whyus"
								placeholder="Please share why you'd like to stay with us and the reason for your upcoming visit"
								rows="4"
							/>
						</FieldGroup>

						<SubmitButtonContainer>
							<SubmitButton className="sans-serif xs-copy center uppercase">
								Submit
							</SubmitButton>
						</SubmitButtonContainer>
					</InfluencerInquiryForm>
				);
			case "Event Vendor Inquiry":
				return (
					<EventVendoryInquiryForm
						id="influencer-inquiry"
						action=""
						onSubmit={(e) => handleSubmit(e, type)}>
						{/* First name  */}
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

						{/* Last name  */}
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

						{/* Business Name  */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="businessname">
								Business Name
							</label>
							<input
								type="text"
								name="businessname"
								placeholder="Business Name"
							/>
						</FieldGroup>

						{/** Goods Or Services */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="goodsorservices">
								Goods or Services
							</label>
							<input
								type="text"
								name="goodsorservices"
								placeholder="Goods or Services"
							/>
						</FieldGroup>

						{/* Email  */}
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

						{/* Phone Number  */}
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

						{/* Business Website */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="website">
								Business Website
							</label>
							<input
								type="text"
								name="website"
								placeholder="Business Website"
							/>
						</FieldGroup>

						{/* Why Are You A Good Fit For Orli  */}
						<FieldGroup className="messageField">
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="message">
								Why Are You A Good Fit For Orli*
							</label>
							<textarea
								required
								name="message"
								placeholder="Your Message"
								rows="4"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</FieldGroup>

						{/** Are You Willing To Participate In Raffles */}
						<FieldGroup>
							<label
								className="sans-serif sub-heading-bold black"
								htmlFor="raffles">
								Are You Willing To Participate In Raffles
							</label>
							<CheckboxesContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="raffles"
										value="yes"
									/>
									<span className="checkmark"></span>
									Yes
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="raffles"
										value="no"
									/>
									<span className="checkmark"></span>
									No
								</StyledCheckboxContainer>
								<StyledCheckboxContainer>
									<input
										type="checkbox"
										name="raffles"
										value="maybe"
									/>
									<span className="checkmark"></span>
									Maybe
								</StyledCheckboxContainer>
							</CheckboxesContainer>
						</FieldGroup>

						{/** Disclaimer Text */}
						<DisclaimerText wide>
							<p className="sans-serif xs-copy black left">
								By submitting, I understand table displays
								cannot exceed 4ft in length for events.
							</p>
						</DisclaimerText>

						{/* Submit Button  */}
						<SubmitButtonContainer>
							<SubmitButton className="sans-serif xs-copy center uppercase">
								Submit
							</SubmitButton>
						</SubmitButtonContainer>
					</EventVendoryInquiryForm>
				);
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
				<p className="sans-serif sub-heading-bold black ">
					{subHeadline}
				</p>
				<h3 className="serif heading black ">{headline}</h3>
				<div
					className="sans-serif body-copy black "
					dangerouslySetInnerHTML={{ __html: blurb }}></div>
				{formStructure(type)}
			</FormContentContainer>
		</section>
	);
}
