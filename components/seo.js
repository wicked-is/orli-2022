import Head from "next/head"
import parse from "html-react-parser"

export default function SEO({ title, description, fullhead }) {
    return (
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {fullhead && parse(fullhead) }
        </Head>
    )
}