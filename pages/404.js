import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header";
import { gsap } from "gsap/dist/gsap";

const FullSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 55vh;
    padding-top: 4rem;
`;
const Title = styled.p`
    color: ${props => (props.white ? "#fff" : "#000")};
    z-index: 1;
    font-size: var(--heading);
    font-family: essonnes-display, serif;
    font-weight: 300;
    line-height: 1.2;
    font-style: normal;
    margin-block-start: 0em;
    margin-block-end: 2rem;
`;
const StyledLink = styled.a`
    color: var(--primary);
    text-transform: uppercase;
    text-decoration: underline;
`;

export default function PageNotFound(props) {
    useEffect(() => {
        var tl = gsap.timeline();
        tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        tl.to("main", { opacity: 1, duration: 0.6 });
        tl.play();
        // var sections = gsap.utils.toArray('.fadein');

        // sections.forEach((section) => {
        //     gsap.to(section, { autoAlpha: 1,
        //         scrollTrigger: {
        //             trigger: section,
        //             start: "+=0 0%",
        //             scrub: false,
        //             markers: false,
        //             toggleActions: "play reverse play reverse"
        //         }
        //     });
        // });
    }, []);

    return (
        <FullSection>
            <>
                <Title mb>This page cannot be found.</Title>
                <Link href="/" passHref>
                    <StyledLink>Visit Home</StyledLink>
                </Link>
            </>
        </FullSection>
    );
}
