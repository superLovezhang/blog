import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { QueryClientProvider, QueryClient } from 'react-query'

import routes from "./config/route"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
