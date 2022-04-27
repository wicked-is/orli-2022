import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp(props) {
  
  const { Component, pageProps } = props
  const navItems = pageProps.data?.data?.myOptionsPage?.options?.navigation?.navigationItems

  return (
      <Layout navItems={navItems}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

