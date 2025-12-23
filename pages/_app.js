import Layout from "../components/layout";

import { WeatherProvider } from "../context/WeatherContext";
import "../styles/Calendar.css";
import "../styles/globals.css";

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
