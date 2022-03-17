import Image from 'next/image'

export default function BlurbLeft({ content, ctaLink, ctaTitle, icon, title }) {
    return (
        <article className="blurbLeftContainer">
            {icon && <Image src={icon} width={100} height={100} />}
            {title && <p>{title}</p>}
            {content && <p>{content}</p>}
            {ctaLink && <p><a href={ctaLink}>{ ctaTitle }</a></p>}
        </article>
    )
}