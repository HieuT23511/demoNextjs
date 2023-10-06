import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { AppProvider } from '@shopify/polaris'
import { DataProvider } from '@/contexts/DataContext'

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </AppProvider>
  )
}
