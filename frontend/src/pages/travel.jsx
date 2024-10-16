import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { Navigate, useNavigate } from "react-router-dom";
import "./travel.css"


const Travel = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [travel, setTravel] = useState("")
    const [fondo_imagen, setFondo] = useState("")

    useEffect(() => {

        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        if (usuario) {
            setUser(user_json)
        } else {
            setUser(null)
            navigate('/')
        }

        //aqui debemos de obtener la informacion del viaje para mostrarla 
        setTravel(localStorage.getItem("travel"))
        setFondo(localStorage.getItem("travel_imagen"))
        console.log(fondo_imagen)

    }, [])

    const fondo = {
        backgroundImage: `url(${fondo_imagen})`
    };


    return (
        <>
            <NavBar user={user} />
            <div className="container-first" style={fondo}>
                <h1>{travel}</h1>
            </div>

        </>
    )



}

export default Travel;