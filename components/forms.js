import styles from '../styles/forms.module.css';
import styled from 'styled-components'

const FormContentContainer = styled.div`
    max-width: 60vw;
    margin: 6rem auto;

    @media (max-width: 601px) {
        max-width: 80vw;
    }
`

const EventForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin-block: 3rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;

    input, textarea {
        border: none;
        border-bottom: 1px solid black;
        padding-block: .75rem;
    }

    &:last-of-type {
        grid-column: 1/3;

        @media (max-width: 768px) {
            grid-column: 1/2;
        }
    }
`;

export default function Form(props) {
    const {
        type,
        subHeadline,
        headline,
        blurb,
        anchorTag
    } = props
    
    const formStructure = (type) => { 
        switch (type) {
            case 'Event Booking':
                return (
                    <EventForm>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="firstname">First name *</label>
                            <input required type="text" name="firstname" placeholder="First Name" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="lastname">Last Name *</label>
                            <input required type="text" name="lastname" placeholder="Last Name" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="phonenumber">Phone Number*</label>
                            <input required type="text" name="phonenumber" placeholder="Your Number" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="email">Email Address*</label>
                            <input required type="email" name="email" placeholder="Your Email" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="startdate">Event Start Date*</label>
                            <input required type="date" name="startdate" placeholder="Event Start Date" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="enddate">Event End Date*</label>
                            <input required type="date" name="enddate" placeholder="Event End Date" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="nguests">Number of Guests</label>
                            <input required type="number" name="nguests" placeholder="Number of Guests" />
                        </FieldGroup>
                        <FieldGroup>
                            <label className="sans-serif sub-heading-bold black" for="nroom">Number of Guest Rooms</label>
                            <input required type="number" name="nrooms" placeholder="Number of Guest Rooms" />
                        </FieldGroup>
                        <FieldGroup className="messageField">
                            <label className="sans-serif sub-heading-bold black" for="additionaldetails">Additional Details*</label>
                            <textarea required name="additionaldetails" placeholder="Your Message" rows="4" />
                        </FieldGroup>
                    </EventForm>
                )
            case 'Contact Form':
                return (
                    <form className={styles.EventForm} >
                    </form>
                )
                default:
                    return null;
            }
    }
    return (
        <section className="max-80">
            <FormContentContainer>
                { anchorTag && (<a id={anchorTag} name={anchorTag} className="anchor"></a>)}
                <p className="sans-serif sub-heading-bold black left">{subHeadline}</p>
                <h3 className="serif heading black left">{headline}</h3>
                <p className="sans-serif body-copy black left">{blurb}</p>
                {formStructure(type)}
            </FormContentContainer>
        </section>
    )
}