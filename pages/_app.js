import "../styles/globals.css";

import Layout from "../components/layout";

function MyApp(props) {
  const { Component, pageProps } = props;
  const navItems =
    props.pageProps?.data?.data?.myOptionsPage.options.navigation
      .navigationItems || null;
  const announcementBar =
    props.pageProps?.data?.data?.myOptionsPage?.options?.announcementBar;
  const socialItems =
    props.pageProps?.data?.data?.myOptionsPage?.options?.socialFooter;

  // console.log(props);

  return (
    <Layout
      navItems={navItems == null ? [] : navItems}
      topBar={announcementBar}
      footerImages={socialItems}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
