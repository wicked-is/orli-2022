import Head from "next/head"
import parse from "html-react-parser"

export default function SEO(props) {
    
    const { title, description, fullhead } = props;
    return (
        <Head>
            <meta name="robots" content="noindex" />
            {title && !fullhead && <title>{title}</title>}
            {description && !fullhead && <meta name="description" content={description} />}
            {fullhead && parse(fullhead) }
        </Head>
    )
}