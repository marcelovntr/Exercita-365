import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CadastroLocalExercicio from "../pages/cadastro/index.jsx";
import PaginaErro from "../pages/PaginaErro";
import PaginaLista from "../pages/lista/index.jsx";
import DashBoard from "../pages/dashboard/index.jsx";
import PaginaLogin from "../pages/login/index.jsx";




let loginAutenticado = JSON.parse(localStorage.getItem("loginAutenticado")) || false;

const PrivateRoute = ({ children }) => {
    return loginAutenticado ?  children  : <Navigate to="/login" />
}

const routes = createBrowserRouter([


    {
        path: "/login",
        element: <PaginaLogin />
    },

    {
        path: "/",
        element:(
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <PaginaErro />,
        children: [

            {
                path: "/",
                element: <DashBoard />
            },

            {
                path: "/cadastro/:id?",
                element: <CadastroLocalExercicio />
            },
            {
                path: "/lista",
                element: <PaginaLista />
            }


        ]

    }


])



export default routes;