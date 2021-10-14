import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import BlogProvider from "./store"
import routes from "./config/route"

function App() {
    return (<BrowserRouter>
        <BlogProvider>
            {renderRoutes(routes)}
        </BlogProvider>
    </BrowserRouter>)
}

export default App
