import { useState } from "react";
import styled from "styled-components";

const Container = styled.section`
	background-color: #f5f3f0;
	height: 100vh;
	max-height: 800px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 60px 20px;
	font-family: "Cormorant Garamond", Georgia, serif;
`;

const SectionLabel = styled.span`
	font-family: "Montserrat", "Helvetica Neue", sans-serif;
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 3px;
	text-transform: uppercase;
	color: #8b6b5d;
	margin-bottom: 24px;
`;

const Stars = styled.div`
	display: flex;
	gap: 4px;
	margin-bottom: 28px;
`;

const Star = styled.span`
	color: #1a1a1a;
	font-size: 16px;
`;

const TestimonialWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 60px;
	max-width: 900px;
	width: 100%;
`;

const ArrowButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.5;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 1;
	}

	svg {
		width: 40px;
		height: 16px;
		stroke: #8b6b5d;
		stroke-width: 1.5;
	}
`;

const QuoteContainer = styled.div`
	text-align: center;
	flex: 1;
`;

const Quote = styled.blockquote`
	font-size: clamp(24px, 4vw, 36px);
	font-weight: 400;
	font-style: italic;
	line-height: 1.5;
	color: #1a1a1a;
	margin: 0 0 32px 0;

	&::before {
		content: '"';
	}

	&::after {
		content: '"';
	}
`;

const ReadMoreLink = styled.a`
	font-family: "Cormorant Garamond", Georgia, serif;
	font-size: 16px;
	font-style: italic;
	color: #1a1a1a;
	text-decoration: underline;
	text-underline-offset: 3px;
	cursor: pointer;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.7;
	}
`;

const Attribution = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	margin-top: 40px;
	font-family: "Montserrat", "Helvetica Neue", sans-serif;
	font-size: 12px;
	color: #4a4a4a;
	letter-spacing: 0.5px;
`;

const TripadvisorIcon = styled.span`
	display: inline-flex;
	align-items: center;

	svg {
		width: 20px;
		height: 20px;
	}
`;

const fake_testimonials = [
	{
		id: 1,
		text: "Maecenas lorem erat, sollicitudin et ultrices ac, sagittis sit amet libero. Donec lacinia maximus enim, tristique varius elit.",
		author: "Elaina M.",
		source: "Tripadvisor",
		stars: 4,
		externalLink: "#",
	},
	{
		id: 2,
		text: "Praesent euismod nisi eu purus mollis, vel tempor nibh consectetur. Nullam auctor risus at diam fermentum.",
		author: "Marcus T.",
		source: "Tripadvisor",
		stars: 5,
		externalLink: "#",
	},
	{
		id: 3,
		text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse potenti.",
		author: "Sophie L.",
		source: "Tripadvisor",
		stars: 5,
		externalLink: "#",
	},
];

export const SocialProofQuery = `
    ... on Page_Flexiblecontent_Sections_SocialProof {
          anchor
          eyebrowTitle
          fieldGroupName
          testimonials {
            comment
            name
            readMoreLink
            sourceLine
            stars
          }
        }`;

const SocialProof = (props) => {
	const { eyebrowTitle = "What Our Guests Are Saying", testimonials } = props;
	console.log(props);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? testimonials.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prev) =>
			prev === testimonials.length - 1 ? 0 : prev + 1
		);
	};

	const currentTestimonial = testimonials[currentIndex];

	return (
		<Container>
			{props.anchor && (
				<a id={props.anchor} style={{ top: "-100px" }}></a>
			)}
			<SectionLabel>{eyebrowTitle}</SectionLabel>

			<Stars>
				{[...Array(currentTestimonial.stars)].map((_, i) => (
					<Star key={i}>★</Star>
				))}
			</Stars>

			<TestimonialWrapper>
				<ArrowButton
					onClick={handlePrev}
					aria-label="Previous testimonial">
					<svg viewBox="0 0 40 16" fill="none">
						<line x1="40" y1="8" x2="2" y2="8" />
						<polyline points="10,2 2,8 10,14" fill="none" />
					</svg>
				</ArrowButton>

				<QuoteContainer>
					<Quote>{currentTestimonial.comment}</Quote>
					{currentTestimonial.readMoreLink && (
						<ReadMoreLink
							href={currentTestimonial.readMoreLink}
							target="_blank"
							rel="noopener noreferrer">
							Read More
						</ReadMoreLink>
					)}
				</QuoteContainer>

				<ArrowButton onClick={handleNext} aria-label="Next testimonial">
					<svg viewBox="0 0 40 16" fill="none">
						<line x1="0" y1="8" x2="38" y2="8" />
						<polyline points="30,2 38,8 30,14" fill="none" />
					</svg>
				</ArrowButton>
			</TestimonialWrapper>

			<Attribution>
				<span>{currentTestimonial.name}</span>
				<span>|</span>
				<span>Posted on {currentTestimonial.sourceLine}</span>
				{currentTestimonial.sourceLine.includes("Tripadvisor") && (
					<TripadvisorIcon>
						<svg viewBox="0 0 24 24" fill="none">
							<circle
								cx="8"
								cy="14"
								r="5"
								stroke="#00aa6c"
								strokeWidth="1.5"
							/>
							<circle cx="8" cy="14" r="2" fill="#00aa6c" />
							<circle
								cx="16"
								cy="14"
								r="5"
								stroke="#00aa6c"
								strokeWidth="1.5"
							/>
							<circle cx="16" cy="14" r="2" fill="#00aa6c" />
							<path
								d="M12 9 L12 6"
								stroke="#00aa6c"
								strokeWidth="1.5"
							/>
							<path
								d="M3 9 C3 9 5 6 12 6 C19 6 21 9 21 9"
								stroke="#00aa6c"
								strokeWidth="1.5"
								fill="none"
							/>
						</svg>
					</TripadvisorIcon>
				)}
			</Attribution>
		</Container>
	);
};

export default SocialProof;
