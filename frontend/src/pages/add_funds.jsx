import React, { useEffect, useState } from "react";
import "./addFunds.css"
import NavBar from "../components/navbar";
import { Navigate, useNavigate } from "react-router-dom";

const Add_funds = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
       
        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        if(usuario){
            setUser(user_json)
        } else {
            setUser(null)
            navigate('/')
        }

    }, [])


    return (
        <>
         <NavBar user={user} />
            <section class="add-card page">
                <form class="form-pay">
                    <label for="name" class="label">
                        <span class="title">Nombre</span>
                        <input
                            class="input-field"
                            type="text"
                            name="input-name"
                            title="Input title"
                            placeholder="Ingresa el nombre de la tarjeta"
                        />
                    </label>
                    <label for="serialCardNumber" class="label">
                        <span class="title">Numero de Tarjeta</span>
                        <input
                            id="serialCardNumber"
                            class="input-field"
                            type="number"
                            name="input-name"
                            title="Input title"
                            placeholder="0000 0000 0000 0000"
                        />
                    </label>
                    <div class="split">
                        <label for="ExDate" class="label">
                            <span class="title">Fecha de expiración</span>
                            <input
                                id="ExDate"
                                class="input-field"
                                type="text"
                                name="input-name"
                                title="Expiry Date"
                                placeholder="01/23"
                            />
                        </label>
                        <label for="cvv" class="label">
                            <span class="title"> CVV</span>
                            <input
                                id="cvv"
                                class="input-field"
                                type="number"
                                name="cvv"
                                title="CVV"
                                placeholder="CVV"
                            />
                        </label>
                    </div>
                    <div class="serialCardNumber">
                        <label for="ExDate" class="label">
                            <span class="title">Fondos a añadir</span>
                            <input
                                id="ExDate"
                                class="input-field"
                                type="text"
                                name="input-name"
                                title="funds"
                                placeholder="Q"
                            />
                        </label>
                    </div>
                    <div class="serialCardNumber">
                        <label for="ExDate" class="label">
                            <span class="title">Contraseña</span>
                            <input
                                id="ExDate"
                                class="input-field"
                                type="text"
                                name="input-name"
                                title="funds"
                                placeholder="Ingrese contraseña"
                            />
                        </label>
                    </div>
                    <input class="checkout-btn" type="button" value="Añadir Fondos" />
                </form>
            </section>
        </>
    );
};

export default Add_funds;
