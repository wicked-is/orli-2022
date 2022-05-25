import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp(props) {
  // Show query errors
  // console.log(props.pageProps.data.errors);
  
  const { Component, pageProps } = props
  const navItems = props.pageProps?.data?.data?.myOptionsPage.options.navigation.navigationItems || null;
  const { announcementBar } = props.pageProps?.data?.data?.myOptionsPage.options || null;

  return (
      <Layout navItems={navItems == null ? [] : navItems} topBar={announcementBar}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

