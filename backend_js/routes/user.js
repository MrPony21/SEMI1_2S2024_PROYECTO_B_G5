const express = require('express');
const router = express.Router();
router.use(express.json({ limit: '50mb' }));
const queries = require('../connections/queries');



router.get('/', (req, res) => {
    res.send("Ruta de users funciona")
});


router.get('/all', async (req, res) => {
    users = await queries.getAllUsers()
    //console.log(users)    
    res.send(users)
})


router.post('/add', async (req, res) => {
    data = req.body




    /* console.log(photo_url) */
    const [addUser, response] = await queries.NewUser(data.username, data.password, data.email)


    //Crea un json de ejemplo, para cargar esto
    // {
    //     "username": "Juan",
    //     "password": "123",
    //     "email": hola@gmail.com "
    // }

    //Aqui se obtiene el id del usuario que se acaba de insertar, para luego obtener el id para insertar la foto de perfil
    console.log(response[0][0].user_id);

    // Si addUser regresa 1, significa que se insertó correctamente
    // Se envia la imagen de perfil a la base de datos
    // Se hizo asi, para evitar duplicar la imagen en la base :)
    // Si addUser regresa 0, significa que hubo un error en la inserción (usuario ya existe) 
    if (addUser == 0) {
        res.status(500).json({ error: response })
        return
    }

    //PENDIENTE SUBIR FOTO DE PERFIL
    res.status(201).json({ message: response })
})



router.put('/edit', async (req, res) => {

    data = req.body
    console.log(data)

    const [editUser, response] = await queries.editUser(data.user_id, data.name, data.email, data.password, data.points, data.profile_url)

    //Crea un json de ejemplo, para cargar esto
    // {
    //     "user_id": 1,
    //     "name": "Juan",
    //     "email": hola@gmail.com"
    //     "password": "123",
    //     "points": 0,
    //     "profile_url": "https://www.google.com"
    // }

    if (editUser != 1) {
        res.status(500).json({ error: response })
        return
    }
    res.status(200).json({ message: "response" })

})



router.delete('/:userid', async (req, res) => {
    let userid = req.params.userid; 

    console.log('Eliminando usuario: ', userid)


    const [deleteUser, response] = await queries.deleteUser(userid)

    if (deleteUser != 1) {
        console.log("Aqui estoy llegando")
        res.status(500).json({ error: response })
        return
    }
    res.status(200).json({ message: response })
})





module.exports = router;