import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { AppProvider } from '@shopify/polaris'
import Account from './account'
import Address from './address'
import '@shopify/polaris/build/esm/styles.css';
import { DataProvider } from '../context/DataContext';


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
