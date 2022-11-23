import styled from "styled-components";

const FAQContainer = styled.section`
    width: 100%;
    max-width: 960px;
    margin-inline: auto;
    margin-top: 5rem;
    margin-bottom: 6rem;

    @media screen and (max-width: 1050px) {
        padding: 0 2rem;
    }
`;

const SingleFAQ = styled.div`
    padding-bottom: 1rem;
    p {
        display: none;
    }
    span#close-faq {
        width: 23px;
        height: 23px;
        background: url("https://orlidev.wpengine.com/wp-content/uploads/2022/11/close-icon.svg")
            no-repeat center center;
        background-size: contain;
        transform: rotate(45deg);
    }
    :has(> .active) {
        p {
            display: block;
        }

        span#close-faq {
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
const Question = styled.h3``;
const Answer = styled.p``;

const handleTabClick = (e, index) => {
    e.preventDefault();
    e.target.classList.toggle("active");
};

export default function FAQ(props) {
    const {
        anchor = "faqs",
        faqs = [],
        title = "Frequently Ask Questions",
        blurb,
    } = props;
    {
        return (
            <FAQContainer>
                <h2 className="heading">{title}</h2>
                <p className="body-copy">{blurb}</p>
                <a id={anchor} name={anchor}></a>
                {faqs &&
                    faqs.map((faq, index) => {
                        return (
                            <SingleFAQ
                                key={`faq-${index + 1}`}
                                onClick={handleTabClick}>
                                <a id={faq.anchor} name={faq.anchor}></a>
                                <Tab>
                                    <Question className="sans-serif-bold uppercase">
                                        {faq.question}
                                    </Question>
                                    <span id="close-faq"></span>
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
        );
    }
}
