import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { AppProvider } from '@shopify/polaris'
import Account from './account'
import Address from './address'

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
