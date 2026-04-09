import Head from "next/head";
import Layout from "../components/layout";

import { WeatherProvider } from "../context/WeatherContext";
import "../styles/Calendar.css";
import "../styles/globals.css";

const ORLI_ADDRESS = {
	"@type": "PostalAddress",
	streetAddress: "7753 Draper Ave",
	addressLocality: "La Jolla",
	addressRegion: "CA",
	postalCode: "92037",
	addressCountry: "US",
};

const siteSchemas = [
	{
		"@context": "https://schema.org",
		"@type": "Hotel",
		name: "Orli",
		url: "https://stayorli.com/",
		telephone: "+18587272776",
		email: "hello@stayorli.com",
		address: ORLI_ADDRESS,
		priceRange: "$$$$",
	},
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Orli",
		url: "https://stayorli.com/",
		telephone: "+18587272776",
		email: "hello@stayorli.com",
		address: ORLI_ADDRESS,
		sameAs: ["https://www.instagram.com/stayorli/"],
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Orli",
		url: "https://stayorli.com/",
	},
];

function MyApp(props) {
	const { Component, pageProps, router } = props;
	const navItems =
		props.pageProps?.data?.data?.myOptionsPage.options.navigation
			.navigationItems || null;
	const announcementBar =
		props.pageProps?.data?.data?.myOptionsPage?.options?.announcementBar;
	const socialItems =
		props.pageProps?.data?.data?.myOptionsPage?.options?.socialFooter;

	return (
		<WeatherProvider>
			<Head>
				{siteSchemas.map((schema, i) => (
					<script
						key={`schema-orli-site-${i}`}
						id={`schema-orli-${schema["@type"].toLowerCase()}-site`}
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
					/>
				))}
			</Head>
			<Layout
				navItems={navItems == null ? [] : navItems}
				topBar={announcementBar}
				footerImages={socialItems}
				page={props?.router?.state?.pathname}
				currentPage={router.asPath}>
				<Component {...pageProps} />
			</Layout>
		</WeatherProvider>
	);
}

export default MyApp;
