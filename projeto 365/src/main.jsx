import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsuariosContextProvider } from "./context/UsuariosContext";
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from "react-router-dom";
import routes from './router/routes'


ReactDOM.createRoot(document.getElementById('root')).render(
 

<UsuariosContextProvider>

<RouterProvider router={routes}/>

</UsuariosContextProvider>
)
