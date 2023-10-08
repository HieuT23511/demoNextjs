import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { AppProvider } from '@shopify/polaris'
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AppProvider>
  )
}
