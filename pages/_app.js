import "../styles/globals.css";

import Layout from "../components/layout";

import { WeatherProvider } from "../context/WeatherContext";

function MyApp(props) {
    const { Component, pageProps } = props;
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
                footerImages={socialItems}>
                <Component {...pageProps} />
            </Layout>
        </WeatherProvider>
    );
}

export default MyApp;
