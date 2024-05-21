import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AddArticle, AllArticles, EditArticle, Home, Login, Signup, ViewArticle } from './pages/index.js'
import { AuthLayout } from './components/index.js'

// Now, Adding the BrowserRoutes
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >
            <Route path='' element={<Home />} />
            <Route path='/login' element={
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            } />
            <Route path='/signup' element={
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            } />
            <Route path='/all-articles' element={
                <AuthLayout authentication={true}>
                    <AllArticles />
                </AuthLayout>
            } />
            <Route path='/add-article' element={
                <AuthLayout authentication={true}>
                    <AddArticle />
                </AuthLayout>
            } />
            <Route path='/edit-article/:slug' element={
                <AuthLayout authentication={true}>
                    <EditArticle />
                </AuthLayout>
            } />
            <Route path='/article/:slug' element={
                <ViewArticle />
            } />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
