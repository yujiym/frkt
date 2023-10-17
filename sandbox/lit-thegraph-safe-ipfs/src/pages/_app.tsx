import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { GRAPHQL_API_ENDPOINT } from "../utils/constants";


// create client instance for GraphQL
const client = new Client({
  url: GRAPHQL_API_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
