import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import "./reservar.css"

const Reservar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [fecha, setFecha] = useState('');

    const handleChange = (event) => {
      setFecha(event.target.value);
    };


    useEffect(() => {


        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        console.log(user_json)
        if (usuario) {
            setUser(user_json)
        } else {
            setUser(null)
        }

    }, [])


    return (
        <div>
            <NavBar user={user} />
            <section className="section_form">
                <form id="consultation-form" className="feed-form" action="#">
                    <label>Nombre de usuario</label>
                    <input required placeholder="Name" type="text" />
                    <label>Correo</label>
                    <input name="email" required placeholder="E-mail" type="email" />
                    <label>Fecha de ida</label>
                    <input name="date-ingreso" required placeholder="Fecha de entrada" type="date"/>
                    <label>Fecha de regreso</label>
                    <input name="date-regreso" required placeholder="Fecha de regreso" type="date"/>
                    <label>Contraseña</label>
                    <input name="contraseña" required placeholder="Contraseña" type="password" />
                    <button className="button_submit">Reservar por Q2532</button>
                </form>
            </section>
        </div>
    )
}

export default Reservar;