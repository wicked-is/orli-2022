import Head from "next/head";
import parse from "html-react-parser";

function getMetaImageValue(html, propertyName) {
	if (!html) return null;

	const regex = new RegExp(
		`<meta[^>]+(?:property|name)=["']${propertyName}["'][^>]*content=["']([^"']+)["'][^>]*>`,
		"i",
	);

	const match = html.match(regex);
	return match ? match[1] : null;
}

function stripMetaImageTags(html, propertyNames) {
	if (!html) return html;

	const cleaned = propertyNames.reduce((value, propertyName) => {
		return value.replace(
			new RegExp(
				`<meta[^>]+(?:property|name)=["']${propertyName}["'][^>]*>`,
				"gi",
			),
			"",
		);
	}, html);

	return cleaned;
}

export default function SEO(props) {
	const { title, description, fullhead, featuredImage } = props;
	const featuredImageUrl = featuredImage?.node?.mediaItemUrl || featuredImage || null;
	const yoastImage = getMetaImageValue(fullhead, "og:image") || getMetaImageValue(fullhead, "twitter:image");
	const fallbackImage = featuredImageUrl || yoastImage || null;
	const sanitizedHead = stripMetaImageTags(fullhead, [
		"og:image",
		"og:image:secure_url",
		"twitter:image",
		"twitter:card",
	]);

	return (
		<Head>
			{title && !fullhead && <title>{title}</title>}
			{description && !fullhead && (
				<meta name="description" content={description} />
			)}
			{fallbackImage && (
				<>
					<meta property="og:image" content={fallbackImage} />
					<meta property="og:image:secure_url" content={fallbackImage} />
					<meta name="twitter:image" content={fallbackImage} />
					<meta name="twitter:card" content="summary_large_image" />
				</>
			)}
			{fullhead && parse(sanitizedHead.replace("/home", "/"))}
		</Head>
	);
}
