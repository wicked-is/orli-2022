import { useEffect } from "react";
import styled from "styled-components";

const FAQMainContainer = styled.section`
	width: 100%;
	background-color: var(--lt-grey);
`;

const FAQContainer = styled.div`
	max-width: 960px;
	padding-top: 5rem;
	padding-bottom: 6rem;
	margin-inline: auto;

	@media screen and (max-width: 1050px) {
		padding: 0 2rem;
		h2 {
			margin: 0rem 0 4rem;
			padding: 8rem 0 0 0;
		}
	}

	a span {
		text-decoration: underline;
	}
	@media screen and (max-width: 1050px) {
	}
`;

const SingleFAQ = styled.div`
	padding-bottom: 1rem;
	p {
		display: none;
	}
	div#close-faq {
		width: 23px;
		height: 23px;
		background: url("https://orlidev.wpengine.com/wp-content/uploads/2022/11/close-icon.svg")
			no-repeat center center;
		background-size: contain;
		transform: rotate(45deg);
	}

	&.active {
		p {
			display: block;
			font-size: var(--body-copy) !important;
			font-family: "GT Walsheim Light" !important;
			line-height: 150%;
		}

		div#close-faq {
			transform: rotate(90deg);
		}
	}
	:not(:last-of-type) {
		border-bottom: 1px solid var(--brown);
	}
`;
const Tab = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`;
const Question = styled.h2``;
const Answer = styled.p``;
const FAQTitle = styled.h2``;

const handleTabClick = (e, index) => {
	e.preventDefault();

	e.target.closest(".faq").classList.toggle("active");
};
const handleQClick = (e, index) => {
	e.preventDefault();

	e.target.closest(".faq").classList.add("active");
};
const handleXClick = (e, index) => {
	e.preventDefault();

	e.target.closest(".faq").classList.toggle("active");
};

export default function FAQ(props) {
	const {
		anchor = "faqs",
		faqs = [],
		title = "Frequently Ask Questions",
		blurb,
	} = props;

	useEffect(() => {
		let qs = document.querySelectorAll(".faq h3, .faq #close-faq");
		qs.forEach((aq) => {
			aq.addEventListener("click", handleTabClick);
		});
	}, []);
	return (
		<FAQMainContainer>
			<FAQContainer>
				<FAQTitle as={!props.index ? "h1" : "h2"} className="heading">
					{title}
				</FAQTitle>
				<p className="body-copy">{blurb}</p>
				{anchor && <a id={anchor} name={anchor}></a>}
				{faqs &&
					faqs.map((faq, index) => {
						return (
							<SingleFAQ
								className="faq"
								id={`faq-${index + 1}`}
								key={`faq-${index + 1}`}>
								{faq.anchor && (
									<a id={faq.anchor} name={faq.anchor}></a>
								)}
								<Tab>
									<Question className="sans-serif uppercase">
										{faq.question}
									</Question>
									<div id="close-faq"></div>
								</Tab>
								<Answer
									className="body-copy"
									dangerouslySetInnerHTML={{
										__html: faq.answer,
									}}></Answer>
							</SingleFAQ>
						);
					})}
			</FAQContainer>
		</FAQMainContainer>
	);
}
