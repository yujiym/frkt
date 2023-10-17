import { Routes } from '@generouted/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql'
import './index.css'
import { GRAPHQL_API_ENDPOINT } from './utils/const.ts'

// create client instance for GraphQL
const client = new Client({
  url: GRAPHQL_API_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <Routes />
    </Provider>
  </React.StrictMode>
)
