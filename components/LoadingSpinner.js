import React from "react";

import styled, { keyframes } from "styled-components";
const spinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div``;

const LoadingSpin = styled.div`
	width: 25px;
	height: 25px;
	border: 2px solid white; /* Light grey */
	border-top: 2px solid transparent; /* Black */
	border-radius: 50%;
	animation: ${spinner} 1.5s linear infinite;
	margin: 0 auto;
`;

const LoadingSpinner = () => {
	return (
		<SpinnerContainer>
			<LoadingSpin></LoadingSpin>
		</SpinnerContainer>
	);
};

export default LoadingSpinner;
