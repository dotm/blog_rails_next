import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Delcius Daily</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
