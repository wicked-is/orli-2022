import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp(props) {
  // console.log(props);
  const { Component, pageProps } = props
  const navItems = props.pageProps?.data?.data?.myOptionsPage.options.navigation.navigationItems || null;
  const { announcementBar } = props.pageProps?.data?.data?.myOptionsPage?.options;

  return (
      <Layout navItems={navItems == null ? [] : navItems} topBar={announcementBar}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

