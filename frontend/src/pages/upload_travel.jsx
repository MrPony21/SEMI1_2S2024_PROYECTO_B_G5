import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import Input from "../components/input";
import Alert from '@mui/material/Alert';
import SizeAvatars from "../components/avatar";
import AvatarUser from "../components/avatar";
import TextField from '@mui/material/TextField';
import "./upload_travel.css"

const Upload_Travel = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [precio, setPrecio] = useState('')
    const [axis_x, setAxis_x] = useState('')
    const [axis_y, setAxis_y] = useState('')
    const [imageTravel, setImageTravel] = useState(null)
    const [description, setDescription] = useState('')

    //alerts 
    //falta por configurarlos
    const [usernameExists, setUsernameExists] = useState(false)
    const [emailExists, setEmailExists] = useState(false)
    const [dataIncomplete, setDataIncomplete] = useState(false)

    useEffect(() => {

        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        if (user_json.name != "admin") {
            navigate('/')
        }

    }, [])



    const handleInputChange = (event) => {
        const { name, value } = event.target; // Obtener el nombre y el valor del input
        if (name == "username") {
            setUsername(value)
        } else if (name == "precio") {
            setPrecio(value)
        } else if (name == "axis-x") {
            setAxis_x(value)
        } else if (name == "axis-y") {
            setAxis_y(value)
        } else if (name == "description") {
            setDescription(value)
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
                setImageTravel(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };


    //falta terminar el submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !precio || !axis_x || !axis_y || !description) {
            setDataIncomplete(true)
            return;
        }
        setDataIncomplete(false)

        const data = {
            username: username,
            precio: precio,
            axis_x: axis_x,
            axis_y: axis_y,
            description: description,
            image: imageTravel
        }

        console.log(data)

    }


    return (

        <div className="register-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                    <label>Nombre</label>
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
                    <label>Descripción </label>
                </div>
                <div className="">
                    <TextField
                        id="outlined-multiline-flexible"
                        placeholder='Descripción'
                        multiline
                        maxRows={4}
                        fullWidth
                        name="description"
                        onChange={handleInputChange}
                        value={description}
                    />
                </div>
                <div className="flex-column">
                    <label>Precio </label>
                </div>
                <div className="inputForm">
                    <Input
                        name="precio"
                        value={precio}
                        placeholder="Ingresa precio en Q"
                        onChange={handleInputChange}
                        type="text"
                    />
                </div>
                <div className="flex-column">
                    <label>Coordenada en x </label>
                </div>
                <div className="inputForm">
                    <Input
                        name="axis-x"
                        value={axis_x}
                        placeholder="Ingresa coordenada en x"
                        onChange={handleInputChange}
                        type="float"
                    />
                </div>
                <div className="flex-column">
                    <label>Coordenada en y </label>
                </div>
                <div className="inputForm">
                    <Input
                        name="axis-y"
                        value={axis_y}
                        placeholder="Ingresa coordenada en y"
                        onChange={handleInputChange}
                        type="float"
                    />
                </div>
                <div className="flex-column">
                    <label>Subir foto de perfil </label>
                </div>
                <div className="travel-image" onClick={handleAvatarClick} style={{ cursor: 'pointer' }} >
                    <img src={imageTravel}></img>
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

                <button type="submit" className="button-submit">Subir destino</button>
                <p className="p">
                  <span className="span" onClick={() => navigate('/')}>Regresar</span>
                </p>
                <div className="flex-row">

                </div>
            </form>

        </div>



    );
};



export default Upload_Travel;
