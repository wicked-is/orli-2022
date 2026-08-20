import Head from "next/head";
import parse from "html-react-parser";

export default function SEO(props) {
	const { title, description, fullhead, featuredImage } = props;
	const featuredImageUrl =
		featuredImage?.node?.mediaItemUrl || featuredImage || null;
	const resolvedTitle = title || "Orli La Jolla";
	const resolvedDescription =
		description ||
		"Boutique hotel in La Jolla.";

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
			{featuredImageUrl && (
				<>
					<meta property="og:image" content={featuredImageUrl} />
					<meta property="og:image:secure_url" content={featuredImageUrl} />
					<meta name="twitter:image" content={featuredImageUrl} />
					<meta name="twitter:card" content="summary_large_image" />
				</>
			)}
			{fullhead && parse(fullhead.replace("/home", "/"))}
		</Head>
	);
}
