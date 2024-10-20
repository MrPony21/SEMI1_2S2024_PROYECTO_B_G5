import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
import NavBar from "../components/navbar";
import Card_travel from "../components/card_travel";

const Home = () => {
    const [user, setUser] = useState(null);

    const travels = [
        { id: 1, title: 'Tikal' , description: "Tikal cuenta con alrededor de 5,000 edificios prehispánicos en un área de aproximadamente de 16 km², de los cuales únicamente el 5% se encuentra restaurado y habilitado para su exploración." , image: "https://imgs.search.brave.com/ZSDkEvQzpKwvfZ7vmsc3I33j_R3TsFlMXRprOGQrCRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWxpbmdjYW51Y2tz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wOC90aWth/bC1uYXRpb25hbC1w/YXJrLUd1YXRlbWFs/YS0yMy5qcGc"},
        { id: 2, title: 'Volcan Acatenango' , description:"El Acatenango es un estratovolcán de Guatemala, el tercer volcán más alto del país, está encercanías de la ciudad de Antigua en el municipio de Acatenango" ,image: "https://imgs.search.brave.com/rWbrty3uDinT_vuq6O1FEmiCaOz1Ea_mJ5GFaG1l9nA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3VhdGV2YWxsZXku/Y29tL3Bob3RvLnBo/cD9tYW49MjgwJm1h/bD0yMzUmbHRpZD1w/aG90by9waG90b19h/MS8xNzY3L1cyTjhq/TU5wZHRWTU42ajNw/SUwzLmpwZw"},
        { id: 3, title: 'Retahuleu', description:"Este parque acuático, es uno de los parques más hermosos de Latinoamérica, con un ambiente tipo selvático y gracias al clima cálido de Retalhuleu" , image: "https://imgs.search.brave.com/de_YHSLSkad4QsvpCmod64yduXNYfGIajhzS_eu3SH4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3VhdGVtYWxhLmNv/bS9mb3Rvcy8yMDI0/LzAzL1RlbGVmb25v/cy1kZS1sb3MtUGFy/cXVlcy1kZWwtSXJ0/cmEtMS5qcGc" },
        { id: 4, title: 'Xela', description: "Quetzaltenango es una ciudad de Guatemala de la zona montañosa del oeste. Tiene un telón de fondo de volcanes, incluido el altísimo Santa María con su domo de lava activo Santiaguito" ,image: "https://imgs.search.brave.com/kRFLboctKPzKHbgD8lTPzEfH0Mk2oU6AN4vRMLFTH1U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2FuZGVyaGVyd2F5/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wNC9JTUdf/MjY1Ni0xMDI0eDc2/OC5qcGVn"},
        { id: 5, title: 'Rio Dulce' , description:"l río Dulce se encuentra en el departamento de Izabal, Guatemala, entre el lago de Izabal y la bahía de Amatique de alrededor de 43 km de largo" , image: "https://imgs.search.brave.com/mlgx7mg4c2UXO6VrEWeSfdK_6HfJtCzAqzossAEn7B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3Muc211Z211Zy5j/b20vQ2VudHJhbC1B/bWVyaWNhL0d1YXRl/bWFsYS9SaW8tRHVs/Y2UvaS04alA4WFA3/LzAvZjg2MmRkZGQv/WDIvUmlvJTIwRHVs/Y2UlMjAoMjApLVgy/LmpwZw"},
        { id: 6, title: 'Antigua Guatemala' , description:"Es una ciudad colonial en el antiplano central de Guatemala, a unos 40 km al suroeste de la capital del país." ,image:"https://imgs.search.brave.com/4NVXWzzRPeNYFPBDPIAoKqEAPMY3Ez_LX7KHTwMRs1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MzUwMzkzMS9waG90/by9hbnRpZ3VhLWNp/dHktZ3VhdGVtYWxh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1jNHZ1dVJ3N3Fs/bEQ0TFljaFVwYm1T/VThTVGtiOE9YYWRj/TEFwWW5faWFNPQ"},
        
    ]

    useEffect(() => {

       
        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        if(usuario){
            setUser(user_json)
        } else {
            setUser(null)
        }

    }, [])

    
    return (
        <div className="principal-container">
            <NavBar user={user} />
            <div className="grid-container">
                {travels.map((travel) => (
                    <div key={travel.id} className="grid-item1">
                        <Card_travel title={travel.title} description={travel.description} src={travel.image} /> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;