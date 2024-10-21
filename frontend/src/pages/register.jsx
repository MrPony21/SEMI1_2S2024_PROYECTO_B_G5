import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import Input from "../components/input";
import Alert from '@mui/material/Alert';
import SizeAvatars from "../components/avatar";
import AvatarUser from "../components/avatar";
import { API_GATEWAY, API_BACKEND } from "../config";
import { Fecha_Actual } from "../date";
import { useRadioGroup } from "@mui/material";

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
        if (name == "username") {
            setUsername(value)
        } else if (name == "email") {
            setEmail(value);
        } else if (name == "password") {
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

        if (!username || !email || !password) {
            setDataIncomplete(true)
            return;
        }
        setDataIncomplete(false)


        //fetch para crear usuario
        const data_user = {
            username: username,
            password: password,
            email: email
        }

        let id_user;
        try {
            const res = await fetch(`${API_BACKEND}/user/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_user),
            });

            if (res.status != 200 && res.status != 201) {
                alert("El usuario ya existe")

            }

            const responseUser = await res.json()
            console.log(responseUser.message)
            id_user = responseUser.message;

        } catch (err) {
            let error = err
            console.error("Error al crear el usuario", error.error)
            console.log("Esto", error.error)
            return
        }



        // AQUI haremos LA subida al S3
        //vamos a quitarle el prefijo de base64
        let base64string = ''
        if (imageAvatar.startsWith('data:image/jpeg;base64,')) {
            // Es un archivo JPG
            base64string = imageAvatar.replace('data:image/jpeg;base64,', '');
        } else if (imageAvatar.startsWith('data:image/png;base64,')) {
            // Es un archivo PNG
            base64string = imageAvatar.replace('data:image/png;base64,', '');
        }

        const fecha_key = Fecha_Actual()

        const sendS3 = {
            photo: base64string,
            key: `Fotos_Perfil/${username}_${fecha_key}`
        }

        console.log(sendS3)

        let url;
        try {
            const res = await fetch(`${API_GATEWAY}/uploadS3`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendS3),
            });

            if (res.status != 200) {
                throw new Error(`Error: ${res.status}`);
            }

            const responseS3 = await res.json();
            const body = JSON.parse(responseS3.body)
            url = body.url
        } catch (err) {
            console.error("Error al subir la imagen:", err);
            console.log(err)
        }

        console.log(url)

        const data_edit =
        {
            "user_id": id_user,
            "name": null,
            "email": null,
            "password": null,
            "points": null,
            "profile_url": url
        };

        //aqui vamos a hacer el fetch para actualizar la foto de perfil
        try {
            const res = await fetch(`${API_BACKEND}/user/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_edit),
            });

            if (res.status != 200 && res.status != 201) {
                alert("Error al hacer el update de la foto")
            
            }

            const responseUpdate = await res.json()
            console.log(responseUpdate.message)

        } catch (err) {
            let error = err
            console.error("Error al crear el usuario", error.error)
            console.log("Esto", error.error)
            return
        }

        

    };





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
                <div className="avatar" onClick={handleAvatarClick} style={{ cursor: 'pointer' }} >
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
