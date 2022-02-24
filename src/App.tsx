import React, { Suspense } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import BlogProvider from "./store"
import routes from "./config/route"

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})
function App() {
    return (<BrowserRouter>
        <QueryClientProvider client={client}>
            <BlogProvider>
                <Suspense fallback={<div>loading...</div>}>
                    {renderRoutes(routes)}
                </Suspense>
            </BlogProvider>
        </QueryClientProvider>
    </BrowserRouter>)
}

export default App
