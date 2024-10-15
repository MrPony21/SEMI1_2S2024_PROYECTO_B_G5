import App from "./App"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register";
import Home from "./pages/home";

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

    }


]);

function AppRoutes(){
    return (<RouterProvider router={Routes}/>)
}

export default AppRoutes;










