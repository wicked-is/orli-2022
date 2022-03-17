export default function ThreePartHeading({ subheader, header, ctaText, ctaLink }) {
    return (
        <>
            {title && <p>{title}</p>}
            {content && <p>{content}</p>}
            {ctaLink && <p><a href={ctaLink}>{ctaText}</a></p>}
        </>
    )
}