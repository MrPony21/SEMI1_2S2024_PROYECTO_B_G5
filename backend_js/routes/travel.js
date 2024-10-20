const express = require('express');
const router = express.Router();
router.use(express.json({ limit: '50mb' }));
const queries = require('../connections/queries');
/* 
-- parametros: travel_name, travel_description, travel_cost, travel_image_link
CALL travel_insert('Tecpan', 'Viaje a tecpan con amigos', 100, 'https://www.google.com'); */

router.get('/', (req, res) => {
    res.send("Ruta de travel funciona")
});


router.get('/all', async (req, res) => {
    users = await queries.getAllTravels()
    //console.log(users)    
    res.send(users)
})


router.post('/add', async (req, res) => {
    data = req.body



    // 'Tecpan', 'Viaje a tecpan con amigos', 100, 'https://www.google.com
    const [addUser, response] = await queries.NewTravel(data.name, data.description, data.cost, data.image_link)

    //Crea un json de ejemplo, para cargar esto
    // {
    //     "name": "Tecpan",
    //     "description": "Viaje a tecpan con amigos",
    //     "cost": 100,
    //     "image_link": "https://www.google.com"
    // }




    if (addUser == 0) {
        res.status(500).json({ error: response })
        return
    }

    //PENDIENTE SUBIR FOTO DE VIAJE
    res.status(201).json({ message: response })
})



router.get('/:travelid', async (req, res) => {
    let travelid = req.params.travelid; 

    console.log('Obteniendo viaje: ', travelid)




    //reconocimiento
    const [deleteUser, response] = await queries.getTravel(travelid)

    if (deleteUser != 1) {
        console.log("Aqui estoy llegando")
        res.status(500).json({ error: response })
        return
    }
    res.status(200).json({ message: response })
})

router.get('/score/:travelid', async (req, res) => {
    let travelid = req.params.travelid; 

    console.log('Obteniendo viaje: ', travelid)




    //reconocimiento
    const [deleteUser, response] = await queries.getTravelScore(travelid)

    if (deleteUser != 1) {
        console.log("Aqui estoy llegando")
        res.status(500).json({ error: response })
        return
    }
    res.status(200).json({ message: response })
})



module.exports = router