export default function ThreePartHeading({ subheader, header, ctaText, ctaLink }) {
    return (
        <>
            {subheader && <p className="sub-heading-bold">{subheader}</p>}
            {header && <p className="heading" style={{ margin: 0 }}>{header}</p>}
            {ctaLink && <p className="xs-copy" style={{ textDecoration: 'underline' }}><a href={ctaLink}>{ctaText}</a></p>}
        </>
    )
}