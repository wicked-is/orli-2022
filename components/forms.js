import styles from '../styles/forms.module.css';

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
                    <form className={styles.EventForm} >
                    </form>
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
            { anchorTag && (<a id={anchorTag} name={anchorTag} className="anchor"></a>)}
             <p className="sans-serif sub-heading-bold black left">{subHeadline}</p>
             <h3 className="serif heading black left">{headline}</h3>
             <p className="sans-serif body-copy black left">{blurb}</p>
            { formStructure(type) }
        </section>
    )
}