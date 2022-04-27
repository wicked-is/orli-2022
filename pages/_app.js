import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp(props) {
  
  console.log('my app props', props);

  const { Component, pageProps } = props
  const navItems = props.pageProps?.data.data.myOptionsPage.options.navigation.navigationItems

  return (
      <Layout navItems={navItems === 0 ? [] : navItems}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

