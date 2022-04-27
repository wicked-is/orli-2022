import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp(props) {
  
  const navItems = props.pageProps.data.data.myOptionsPage.options.navigation.navigationItems
  const { Component, pageProps } = props

  return (
      <Layout navItems={navItems}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

