import { useEffect, useState } from "react"
import styled from "styled-components"

const GateContainer = styled.section`
    z-index: 99999999999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background-image: url('https://orlidev.wpengine.com/wp-content/uploads/2022/08/gate-background.jpg');
    background-size: cover;
    background-position: top left;
    overflow: hidden;
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const FormField = styled.input`
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid white;
    color: white;
    text-align: left;
    margin-bottom: 2rem;

    &::placeholder {
        color: white;
    }
    &:focus {
        outline: none;
    }
`
const FormButton = styled.button`
    width: 270px;
    max-width: 85%;
    height: 80px;
    margin-inline: auto;
    background-color: var(--brown);
    border: 0;
    color: white;
`
export default function Gate(props) {

    const [password, setPassword] = useState('');
    const { login } = props

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( password.trim().toLowerCase() == 'friendsoforli' ) {
            localStorage.setItem("loggedin", true)
            login(true);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("loggedin")) {
            login(true)
        }
    })

    return (
        <GateContainer>
            <ContentContainer>
                <FormField className="body-copy sans-serif" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <FormButton className="body-copy sans-serif" onClick={(e) => handleSubmit(e)}>Submit</FormButton>
            </ContentContainer>
        </GateContainer>
    )
}