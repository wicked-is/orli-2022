import Head from "next/head";
import parse from "html-react-parser";

function getMetaTagValue(html, propertyNames) {
	if (!html) return null;

	for (const propertyName of propertyNames) {
		const regex = new RegExp(
			`<meta[^>]+(?:property|name)=["']${propertyName}["'][^>]*content=["']([^"']+)["'][^>]*>`,
			"i",
		);
		const match = html.match(regex);
		if (match) return match[1];
	}

	return null;
}

function stripMetaImageTags(html, propertyNames) {
	if (!html) return html;

	let cleaned = html;
	cleaned = cleaned.replace(/<title[^>]*>.*?<\/title>/gis, "");

	for (const propertyName of propertyNames) {
		cleaned = cleaned.replace(
			new RegExp(
				`<meta[^>]+(?:property|name)=["']${propertyName}["'][^>]*>`,
				"gi",
			),
			"",
		);
	}

	return cleaned;
}

export default function SEO(props) {
	const {
		title,
		description,
		fullhead,
		featuredImage,
		socialTitle,
		socialDescription,
	} = props;
	const featuredImageUrl =
		featuredImage?.node?.mediaItemUrl || featuredImage || null;
	const yoastImage =
		getMetaTagValue(fullhead, ["og:image", "twitter:image"]) || null;
	const resolvedTitle =
		socialTitle ||
		title ||
		getMetaTagValue(fullhead, ["og:title", "twitter:title"]) ||
		null;
	const resolvedDescription =
		socialDescription ||
		description ||
		getMetaTagValue(fullhead, [
			"og:description",
			"twitter:description",
			"description",
		]) ||
		null;
	const fallbackImage = featuredImageUrl || yoastImage || null;
	const sanitizedHead = stripMetaImageTags(fullhead, [
		"og:image",
		"og:image:secure_url",
		"twitter:image",
		"twitter:card",
		"og:title",
		"og:description",
		"twitter:title",
		"twitter:description",
		"description",
	]);

	return (
		<Head>
			{resolvedTitle && <title>{resolvedTitle}</title>}
			{resolvedDescription && (
				<meta name="description" content={resolvedDescription} />
			)}
			{resolvedTitle && (
				<>
					<meta property="og:title" content={resolvedTitle} />
					<meta name="twitter:title" content={resolvedTitle} />
				</>
			)}
			{resolvedDescription && (
				<>
					<meta property="og:description" content={resolvedDescription} />
					<meta name="twitter:description" content={resolvedDescription} />
				</>
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
