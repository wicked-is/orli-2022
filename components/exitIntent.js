import Image from "next/image";
import { useEffect, useState} from "react";
import { useWindowSize } from "../utils/hooks";
import styled, { css } from "styled-components";

const ExitUnderlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0px;
    right: 0px;
    display: block;
    left: 0px;
    bottom: 0px;
    background: rgba(0,0,0,0.5);
    z-index: 998;
`;

const ExitContainer = styled.div`
    position: fixed;
    width: 100%;
    max-width: 70%;
    margin: auto;
    display: flex;
    height: 70vh;
    flex-wrap: wrap;
    z-index: 999;
    align-items: center;
    top: 50%;
    left: 50%;
    -ms-transform: translateY(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
    width: 50%;
    overflow: hidden;
    height: 100%;
    position: relative;
`;

const ContentContainer = styled.div`
    width: 50%;
    background: #fff;
    height: 100%;
    position: relative;

    & .close {
        position: absolute; right: 1rem; top: 1rem;
    }
`;

const TextContainer = styled.div`
    padding: 4rem;

    & #email {
        border-left: 0px;
        width: 100%;
        border-top: 0px;
        border-right: 0px;
        border-bottom: 1px solid var(--black);
    }
    & .submit {
        background: var(--brown);
        color: var(--white);
        text-transform: uppercase;
        padding: 0.5rem 2rem;
        border: 0px;
        margin: 2rem auto auto;
        font-family: "GT Walsheim Light";
        font-size: var(--xs-copy);
    }
`;

export default function ExitIntent(props) {
    const {headline, bodyCopy, image} = props

    const size = useWindowSize();

    const [email, setEmail] = useState("");
    const [firstname, setFirst] = useState("");
    const [lastname, setLast] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch(
            "https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/",
            {
                method: "POST",
                body: JSON.stringify({
                    email, firstname, lastname
                }),
            }
        );

        handleResponse(res);
    };

    const handleResponse = async res => {
        if (res.status === 200) setSuccess(true);
    };

    return (
        <section>
        <ExitContainer>
            <ImageContainer>
            <Image 
                src="https://orlidev.wpengine.com/wp-content/uploads/2022/11/orli-la-jolla-girl-and-dog-at-window.jpg"
                alt="orli la jolla woman and dog by the window"
                width={1136}
                height={1318}
                layout="intrinsic"
            />
            </ImageContainer>
            <ContentContainer>
                <div className="close" onClick={() => props.toggleModal(false)}>
                    <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/11/close-icon.svg" alt="close" width={30} height={30} layout="intrinsic"/>
                </div>
                <TextContainer>
                    <h3 className="serif heading black left">Psst! Don't Miss Out</h3>
                    <p className="sans-serif body black left">Be the first to know about exclusive offers and special happenings at Orli La Jolla.
</p>  
                    {success ? (
                        <div style={{
                            minHeight: "47px",
                            display: "flex",
                            alignContent: "center",
                        }}>
                            <p className="sans-serif copyright xs-copy white left" style={{
                                verticalAlign: "center",
                            }}>
                                Success. Thanks for joining us.
                            </p>
                        </div>
                        ) : (
                        <form
                            id="emailcapture"
                            action="https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/"
                            onSubmit={handleSubmit}>
                            <input
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                 placeholder="First Name*"
                                onChange={() =>
                                 setFirst(event.target.value)
                                }
                             />
                             <input
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                 placeholder="Last Name*"
                                onChange={() =>
                                 setLast(event.target.value)
                                }
                              />
                            <input
                                id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter Email*"
                                    onChange={() =>
                                        setEmail(event.target.value)
                                    }
                                />
                            <button className="submit" aria-label="button">Submit</button>
                        </form>
                    )}
                </TextContainer>
            </ContentContainer>
        </ExitContainer>
        <ExitUnderlay></ExitUnderlay>
        </section>
    );
}