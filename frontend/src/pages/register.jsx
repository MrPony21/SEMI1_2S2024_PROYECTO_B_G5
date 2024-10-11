import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import Input from "../components/input";
import Alert from '@mui/material/Alert';
import SizeAvatars from "../components/avatar";
import AvatarUser from "../components/avatar";


const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    //alerts 
    //falta por configurarlos
    const [usernameExists, setUsernameExists] = useState(false)
    const [emailExists, setEmailExists] = useState(false)
    const [dataIncomplete, setDataIncomplete] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target; // Obtener el nombre y el valor del input
        if( name == "username"){
            setUsername(value)
        }else if ( name == "email"){
            setEmail(value);
        }else if( name == "password"){
            setPassword(value)
        }
    };

    //aqui pondremos los submit para subir el avatar
    const handleAvatarClick = () => {
        document.getElementById("avatarInput").click();

    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageAvatar(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };


    //falta terminar el submit
    const handleSubmit = async (e) => {
            e.preventDefault()

            if (!username || !email || !password){
                setDataIncomplete(true)
                return;
            }
            setDataIncomplete(false)

    }


    return (

        <div className="register-container">
            <form className="form" onSubmit={handleSubmit}>
            <div className="flex-column">
                <label>Nombre de Usuario </label>
            </div>
            <div className="inputForm">
                <Input
                    name="username"
                    value={username}
                    placeholder="Ingresa nombre de usuario"
                    onChange={handleInputChange}
                    type="text"
                />
            </div>
            <div className="flex-column">
                <label>Correo </label>
            </div>
            <div className="inputForm">

                <Input
                    name="email"
                    value={email}
                    placeholder="Ingresa correo"
                    onChange={handleInputChange}
                    type="email"
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
            <div className="flex-column">
                <label>Subir foto de perfil </label>
            </div>
            <div className="avatar" onClick={handleAvatarClick} style={{cursor: 'pointer'}} >
                <AvatarUser width={120} height={120} src={imageAvatar} />
            </div>
            <input
                id="avatarInput"
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />


            {usernameExists && (
                 <Alert severity="error">El nombre de usuario ya existe</Alert>
            )}
            {emailExists && (
                 <Alert severity="error">El correo electronico ya esta registrado</Alert>
            )}
            {dataIncomplete && (
                 <Alert severity="error">Favor de llenar todos los campos</Alert>
            )}

            <button type="submit" className="button-submit">Registrarse</button>
            <p className="p">
                Ya tienes una cuenta? <span className="span" onClick={() => navigate('/login')}>Inicia Sesion</span>
            </p>
            <div className="flex-row">

            </div>
        </form>

        </div>

        

    );
};



export default Register;