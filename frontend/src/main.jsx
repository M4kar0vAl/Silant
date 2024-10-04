import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import {
    ShortMachineDataProvider,
    TableDataProvider,
    AuthProvider,
    UserDataProvider,
    CatalogDataProvider
} from './context'


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserDataProvider>
                    <ShortMachineDataProvider>
                        <TableDataProvider>
                            <CatalogDataProvider>
                                <App />
                            </CatalogDataProvider>
                        </TableDataProvider>
                    </ShortMachineDataProvider>
                </UserDataProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
