import App from "./App"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register";
import Home from "./pages/home";
import Add_funds from "./pages/add_funds";
import Travel from "./pages/travel";
import Reservar from "./pages/reservar";
import Upload_Travel from "./pages/upload_travel";

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
    },
    {
        path: "/travel",
        element: <Travel/>
    },
    {
        path: "/reservar",
        element: <Reservar/>
    },
    {
        path: "/uploadTravel",
        element: <Upload_Travel/>
    }


]);

function AppRoutes(){
    return (<RouterProvider router={Routes}/>)
}

export default AppRoutes;










