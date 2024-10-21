import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/navbar";
import { Navigate, useNavigate } from "react-router-dom";
import "./travel.css"
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Comments from "../components/comments";
import Dialog_comment from "../components/dialog_comment";
import { API_BACKEND, API_GATEWAY } from "../config";

const Travel = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [travel, setTravel] = useState("")
    const [fondo, setFondo] = useState("")
    const [description, setDescription] = useState("")
    const [showDescription, setShowdescription] = useState("")
    const mapContainer = useRef(null);
    const [idioma, setidioma] = React.useState('');
    const [cost, setCost] = useState(0)
    const [audioSrc, setAudioSrc] = useState(false)


    useEffect(() => {

        const usuario = localStorage.getItem("user");
        const user_json = JSON.parse(usuario)
        if (usuario) {
            setUser(user_json)
        } else {
            setUser(null)
        }



        const id_travel = localStorage.getItem("travel_id")
        console.log(id_travel)
        //aqui vamos a obtener la informacion del viaje
        const GetTravel = async () => {
            try {
                const res = await fetch(`${API_BACKEND}/travel/${id_travel}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status != 200 && res.status != 201) {
                    alert("Error al obtener el viaje")
                }

                const response = await res.json()
                console.log(response.message)
                let viaje = response.message
                setTravel(viaje.travel_name)
                setFondo(viaje.travel_image_link)
                setDescription(viaje.travel_description)
                setShowdescription(viaje.travel_description)
                setCost(viaje.travel_cost)


            } catch (err) {
                let error = err
                console.error("Error al obtener el travel", error)
                return
            }
        }

        GetTravel()


        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json', // URL de estilo del mapa
            center: [-89.623611, 17.221944,], // Coordenadas del centro del mapa
            zoom: 5, // Nivel de zoom inicial
        });

        new maplibregl.Marker()
            .setLngLat([-89.623611, 17.221944])
            .addTo(map);

        return () => {
            map.remove(); // Limpia el mapa cuando el componente se desmonte
        };



    }, [])


    const traducir = async () => {
        console.log(idioma)

        if (idioma == "es") {
            setShowdescription(description)
        }

        const sendTraducir = {

            text: description,
            lang: idioma

        }
        console.log(sendTraducir)

        try {
            const res = await fetch(`${API_GATEWAY}/traducir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendTraducir),
            });

            if (res.status != 200) {
                throw new Error(`Error: ${res.status}`);
            }

            const responseTr = await res.json();
            const body = responseTr
            console.log(body.new_text)
            setShowdescription(body.new_text)

        } catch (err) {
            console.error("Error al subir la imagen:", err);
            console.log(err)
        }

    }

    const handleEscuchar = async () => {

        const sendEscuchar = {
            text: showDescription
        }

        try {
            const res = await fetch(`${API_GATEWAY}/escuchar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendEscuchar),
            });

            if (res.status != 200) {
                throw new Error(`Error: ${res.status}`);
            }

            const response = await res.json();
            const body = JSON.parse(response.body)
            const audiobase64 = body.audio
            const audioURL = `data:audio/mp3;base64,${audiobase64}`;
            console.log("Estoy aqui:", audioURL)
            setAudioSrc(audioURL)

        } catch (err) {
            console.error("Error al ejecutar polly :", err);
            console.log(err)
        }

    }


    const handleChange = (event) => {
        setidioma(event.target.value);

    };

    return (
        <>
            <NavBar user={user} />
            <div className="title-div">
                <h1>{travel}</h1>
                <div className="button-div">
                    <button onClick={() => navigate('/reservar')} >
                        <span class="transition"></span>
                        <span class="gradient"></span>
                        <span class="label">Reservar por Q{cost}</span>
                    </button>
                </div>
            </div>
            <div className="container-first" >
                <div className="img-div">
                    <img src={fondo}></img>
                    <div className="etiquetas-div">
                        <span class="etiqueta">Etiqueta</span>
                        <span class="etiqueta">Etiqueta</span>
                        <span class="etiqueta">Etiqueta</span>
                        <span class="etiqueta">Etiqueta</span>
                        <span class="etiqueta">Etiqueta</span>
                    </div>
                </div>
                <div class="modal">
                    <article class="modal-container">
                        <header class="modal-container-header">
                            <span class="modal-container-title">
                                Description
                            </span>
                        </header>
                        <section class="modal-container-body rtf">
                            <p>{showDescription}</p>
                        </section>
                        <footer class="modal-container-footer">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">idioma</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={idioma}
                                    label="idioma"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="es">Español</MenuItem>
                                    <MenuItem value="en">Ingles</MenuItem>
                                    <MenuItem value="ja">Japones</MenuItem>
                                </Select>
                            </FormControl>
                            <button class="button is-primary" onClick={traducir}>Traducir</button>
                            <button class="button is-primary" onClick={handleEscuchar}>Escuchar</button>
                            

                        </footer>
                        {audioSrc && (
                            <div>
                                <audio controls>
                                    <source src={audioSrc} type="audio/mp3" />
                                    Tu navegador no soporta la reproducción de audio.
                                </audio>
                            </div>
                        )}
                    </article>
                </div>
                <div ref={mapContainer} className="map-container">

                </div>

            </div>

            <div className="comentarios">
                <div className="comment-header">
                    <h3>Comentarios</h3>
                    <Dialog_comment></Dialog_comment>
                </div>
                <div className="div-comentarios">
                    <Comments></Comments>
                    <Comments></Comments>
                    <Comments></Comments>
                </div>
            </div>


        </>
    )



}

export default Travel;