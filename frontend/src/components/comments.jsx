import React, { useEffect, useState, useRef } from "react";
import "./comments.css"
import RatingComponent from "./rating";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Comments = () => {
    const [idioma, setidioma] = React.useState('');

    const handleChange = (event) => {
        setidioma(event.target.value);

    };

    return (
        <>
            <div class="comment">
                <article class="comment-container">
                    <header class="comment-container-header">
                        <span class="comment-container-title">
                            Nombre
                            <RatingComponent readonly={false}></RatingComponent>
                        </span>
                    </header>
                    <section class="comment-container-body rtf">
                        <p>Lorem ipm diligentius saepiusque ista loquemur inter nos idiomamusque communiter. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Quid igitur dubitamus in tota eius natura quaerere quid sit effectum? Duo Reges: constructio interrete.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Hoc est non modo cor non habere, sed ne palatum quidem. Sic, et quidem diligentius saepiusque ista loquemur inter nos idiomamusque communiter. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Quid igitur dubitamus in tota eius natura quaerere quid sit effectum? Duo Reges: constructio interrete</p>
                    </section>
                    <footer class="comment-container-footer">
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
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
                        <button class="button is-primary" >Traducir</button>
                        <button class="button is-primary">Oir</button>
                    </footer>
                </article>
            </div>
        </>
    )

}


export default Comments;