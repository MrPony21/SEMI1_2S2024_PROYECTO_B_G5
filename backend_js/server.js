const express = require('express')
const cors = require('cors')
const app = express()


app.get('/', (req,res) => {
    console.log("hola")
    res.send("Servidor de node js funciona")
})

app.listen(4000)