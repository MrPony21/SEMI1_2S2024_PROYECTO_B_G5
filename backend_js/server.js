const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json({limit: '50mb'}))
app.use(cors());
const userRoute = require('./routes/user') 
const travelRoute = require('./routes/travel') 
const reviewRoute = require('./routes/review')


app.get('/', (req,res) => {
    console.log("hola")
    res.send("Servidor de node js funciona")
})


app.use("/user", userRoute);
app.use("/travel", travelRoute);
app.use("/review", reviewRoute);


app.listen(4000);


