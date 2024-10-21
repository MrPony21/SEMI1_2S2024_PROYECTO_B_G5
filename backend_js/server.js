const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json({limit: '50mb'}))
app.use(cors());
const userRoute = require('./routes/user') 
const travelRoute = require('./routes/travel') 
const reviewRoute = require('./routes/review')
const cognitoRoute = require('./routes/cognito')
const locationRoute = require('./routes/location')


app.get('/', (req,res) => {
    console.log("hola")
    res.send("Servidor de node js funciona")
})


app.use("/user", userRoute);
app.use("/travel", travelRoute);
app.use("/review", reviewRoute);
app.use("/cognito", cognitoRoute);
app.use("/location", locationRoute);


app.listen(4000);


