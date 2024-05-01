import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CadastroLocalExercicio from "../pages/cadastro/index.jsx";
import PaginaErro from "../pages/PaginaErro";

import PaginaLista from "../pages/lista/index.jsx";
import DashBoard from "../pages/dashboard/index.jsx";
import PaginaLogin from "../pages/login/index.jsx";

const routes = createBrowserRouter([

{

    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
        {
            path: "/",
            element: <PaginaLogin />
        },
        {
            path: "/dashboard",
            element: <DashBoard />
        },

        {
            path: "/cadastro",
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