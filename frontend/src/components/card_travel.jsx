import React from "react";
import "./card_travel.css"

const Card_travel = ( { title, description ,src }) => {

    return (

        <div class="card">
            <img viewBox="0 0 24 24" src={src}></img>
            <div class="card__content">
                <p class="card__title">{title}</p>
                <p class="card__description">{description}</p>
            </div>
        </div>


    )
}

export default Card_travel;

