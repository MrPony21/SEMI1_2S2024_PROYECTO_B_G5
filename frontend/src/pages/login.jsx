import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import Input from "../components/input";
import Alert from '@mui/material/Alert';
import verificationDialog from "./verification";


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    const [showVerification, setShowVerification] = useState(false)

    //alerts 
    const [dataIncomplete, setDataIncomplete] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target; // Obtener el nombre y el valor del input
        if (name == "username") {
            setUsername(value)
        } else if (name == "password") {
            setPassword(value)
        }
    };


    //falta terminar el submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setDataIncomplete(true)
            return;
        }
        setDataIncomplete(false)
        console.log(username, password)

        let data = ""
        if(username == "admin" && password== "admin"){
            data = {
                name: "admin", 
                profile_pic: "https://i.pinimg.com/736x/b8/d6/87/b8d6875b1e58bf34ba1eac2253eea106.jpg", 
                saldo:"600"
            }
        }else{
            data = { 
                name: "marco", 
                profile_pic: "https://i.pinimg.com/736x/b8/d6/87/b8d6875b1e58bf34ba1eac2253eea106.jpg", 
                saldo:"600"
            }
        }

        localStorage.setItem("user", JSON.stringify(data) )
        navigate("/")

    }


    return (
        <div className="login-container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <img src="src\assets\LOGO.png" alt="Logo" width={200} ></img>
                </div>
                <div className="flex-column">
                    <label>Nombre de usuario </label>
                </div>
                <div className="inputForm">
                    <Input
                        name="username"
                        value={username}
                        placeholder="Ingresa nombre de usuario o correo"
                        onChange={handleInputChange}
                        type="text"
                    />
                </div>
                <div className="flex-column">
                    <label>Contraseña </label>
                </div>
                <div className="inputForm">
                    <Input
                        name="password"
                        value={password}
                        placeholder="Ingresa contraseña"
                        onChange={handleInputChange}
                        type="password"
                    />
                </div>


                {dataIncomplete && (
                    <Alert severity="error">Favor de llenar todos los campos</Alert>
                )}

                <button type="submit" className="button-submit">Iniciar Sesion</button>
                <p className="p">
                    Aun no tienes una cuenta? <span className="span" onClick={() => navigate('/register')}>Registrate</span>
                </p>

                <span className="span" onClick={() => navigate('/')}>Volver</span>


                <div className="flex-row">

                </div>
            </form>

                {showVerification && (
                    <verificationDialog/>

                )}

        </div>


    );
};



export default Login;
