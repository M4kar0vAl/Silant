import { Route, Routes } from 'react-router-dom'

import { BasicLayout } from './layouts'
import { AuthenticatedOnlyRoute, NotAuthenticatedOnlyRoute } from './routes'
import { HomePage, AuthPage, DetailPage, CreatePage, CatalogListPage } from './pages'

import './App.css'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<BasicLayout />} >
                    <Route index element={<HomePage />} />
                    <Route element={<NotAuthenticatedOnlyRoute />}>
                        <Route path='auth' element={<AuthPage />} />
                    </Route>
                    <Route element={<AuthenticatedOnlyRoute />}>
                        <Route path='machine/'>
                            <Route path=':serialNumber' element={<DetailPage entity='machine' />} />
                            <Route path='create' element={<CreatePage entity='machine' />} />
                        </Route>
                        <Route path='maintenance/'>
                            <Route path=':maintenanceId' element={<DetailPage entity='maintenance' />} />
                            <Route path='create' element={<CreatePage entity='maintenance' />} />
                        </Route>
                        <Route path='reclamation/'>
                            <Route path=':reclamationId' element={<DetailPage entity='reclamation' />} />
                            <Route path='create' element={<CreatePage entity='reclamation' />} />
                        </Route>
                        <Route path='catalog/'>
                            <Route index element={<CatalogListPage />} />
                            <Route path=':catalogId' element={<DetailPage entity='catalog' />} />
                            <Route path='create' element={<CreatePage entity='catalog' />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
