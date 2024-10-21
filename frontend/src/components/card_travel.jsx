import React from "react";
import "./card_travel.css"
import StarRateIcon from '@mui/icons-material/StarRate';
import { FaStar } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";

//se planea manejar con id el travel
const Card_travel = ({ id ,title, description, src, price, rate }) => {
    const navigate = useNavigate()
    const navigate_to_travel = () => {

        localStorage.setItem("travel", title)
        localStorage.setItem("travel_imagen", src)
        localStorage.setItem("travel_id", id)
        navigate("/Travel")

    }

    return (

        <div class="card">
            <img viewBox="0 0 24 24" src={src}></img>
            <div class="card__content">
                <p class="card__title">{title}</p>
                <p class="card__description">{description}</p>
                <div className="div-button">
                    <>
                        <div className="div-rate-price">
                            <p className='p-rate' >{rate}</p>
                            <FaStar className="star-rate" />
                        </div>
                        <div className="div-price">
                            <h3 className="price" >Q{price}</h3>
                        </div>
                        <div>
                            <button onClick={navigate_to_travel}>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">Reservar</span>
                            </button>
                        </div>
                    </>
                </div>
            </div>
        </div>


    )
}

export default Card_travel;

