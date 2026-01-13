import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const GateContainer = styled.section`
	z-index: 99999999999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	background-image: url("https://orlidev.wpengine.com/wp-content/uploads/2022/08/bg-with-lines.png");
	background-size: cover;
	background-position: top left;
	overflow: hidden;
`;
const Logo = styled.img`
	position: absolute;
	top: 2rem;
	left: 2rem;
`;
const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
const FormField = styled.input`
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid white;
	color: white;
	text-align: left;
	margin-bottom: 2rem;

	cursor: pointer;
	&::placeholder {
		color: white;
	}
	&:focus {
		outline: none;
	}
`;
const FormButton = styled.button`
	width: 270px;
	max-width: 85%;
	height: 80px;
	margin-inline: auto;
	background-color: var(--brown);
	border: 0;
	color: white;
	cursor: pointer;
`;
export default function Gate(props) {
	const [password, setPassword] = useState("");
	const { login } = props;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password.trim().toLowerCase() == "friendsoforli") {
			localStorage.setItem("loggedin", true);
			login(true);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("loggedin")) {
			login(true);
		}
	});

	return (
		<GateContainer>
			<Link href="/">
				<Logo
					src="https://orlidev.wpengine.com/wp-content/uploads/2022/08/Orli_Logo_WithLocator_Black-1.png"
					alt="Orli La Jolla Logo"
					width={124}
					height={72}
				/>
			</Link>
			<ContentContainer>
				<FormField
					className="body-copy sans-serif"
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<FormButton
					className="body-copy sans-serif"
					onClick={(e) => handleSubmit(e)}>
					Submit
				</FormButton>
			</ContentContainer>
		</GateContainer>
	);
}
