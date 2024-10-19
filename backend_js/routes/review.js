const express = require('express');
const router = express.Router();
router.use(express.json({ limit: '50mb' }));
const queries = require('../connections/queries');


//Haz una respuesta para ver si se levanto correctamente la ruta
router.get('/', (req, res) => {
    res.send("Ruta de reviews funciona")
});

//  review_insert('Muy buen viaje', 5, 1, 1);


router.post('/add', async (req, res) => {
    data = req.body



  
    const [addUser, response] = await queries.NewReview(data.description, data.score, data.user, data.travel);

    //Crea un json de ejemplo, para cargar esto
    // {
    //     "description": "Muy buen viaje",
    //     "score": 5,
    //     "user": 1,
    //     "travel": 1
    // }

    if (addUser == 0) {
        res.status(500).json({ error: response })
        return
    }

    //PENDIENTE SUBIR FOTO DE VIAJE
    res.status(201).json({ message: response })
})

//Para obtener los comentarios de un viaje
router.get('/:travelid', async (req, res) => {
    let travelid = req.params.travelid; 

    console.log('Obteniendo viaje: ', travelid)

    //reconocimiento
    const [getTravel, response] = await queries.getReview(travelid)

    if (getTravel != 1) {
        console.log("Aqui estoy llegando")
        res.status(500).json({ error: response })
        return
    }
    res.status(200).json({ message: response })
})


module.exports = router;