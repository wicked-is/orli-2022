export default function ThreePartHeading({ subheader, header, ctaText, ctaLink }) {
    return (
        <>
            {subheader && <p>{subheader}</p>}
            {header && <p>{header}</p>}
            {ctaLink && <p><a href={ctaLink}>{ctaText}</a></p>}
        </>
    )
}