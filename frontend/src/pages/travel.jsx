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

const Travel = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [travel, setTravel] = useState("")
    const [fondo, setFondo] = useState("")
    const mapContainer = useRef(null);
    const [idioma, setidioma] = React.useState('');


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
        console.log(fondo)

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


    const traducir = () => {
        console.log(idioma)

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
                    <button >
                        <span class="transition"></span>
                        <span class="gradient"></span>
                        <span class="label">Reservar por Q2130</span>
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Hoc est non modo cor non habere, sed ne palatum quidem. Sic, et quidem diligentius saepiusque ista loquemur inter nos idiomamusque communiter. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Quid igitur dubitamus in tota eius natura quaerere quid sit effectum? Duo Reges: constructio interrete.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Hoc est non modo cor non habere, sed ne palatum quidem. Sic, et quidem diligentius saepiusque ista loquemur inter nos idiomamusque communiter. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Quid igitur dubitamus in tota eius natura quaerere quid sit effectum? Duo Reges: constructio interrete</p>
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
                                    <MenuItem value="spanish">Español</MenuItem>
                                    <MenuItem value="english">Ingles</MenuItem>
                                    <MenuItem value="japones">Japones</MenuItem>
                                </Select>
                            </FormControl>
                            <button class="button is-primary" onClick={traducir}>Traducir</button>
                            <button class="button is-primary">Oir</button>

                        </footer>
                    </article>
                </div>
                <div ref={mapContainer} className="map-container">
                    
                </div>

            </div>

            <div className="comentarios">
                <div className="comment-header">
                    <h3>Comentarios</h3>
                    <button class="button-comment">Comentar</button>
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