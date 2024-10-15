import App from "./App"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register";
import Home from "./pages/home";
import Add_funds from "./pages/add_funds";

const Routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/",
        element: <Home/>

    },
    {
        path: "/addFunds",
        element: <Add_funds/>
    }


]);

function AppRoutes(){
    return (<RouterProvider router={Routes}/>)
}

export default AppRoutes;










