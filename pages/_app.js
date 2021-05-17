import Head from 'next/head';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import configureStore from '../isomorphic/store';
import '../styles/globals.css';
import Main from '../client/components/main/main';

const store = configureStore();

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Next.js PWA Example</title>

          <link rel="manifest" href="/manifest.json" />
          <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Main pageProps={pageProps} Component={Component} router={router} />
      </Provider>
    </>
  );
}
