const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require("./routes");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('server is running', port)
})

app.use(cors()) 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app)

mongoose.connect(`mongodb+srv://ngovanlan47:crvw0VTHK6pHb0xC@cluster0.0n04fzt.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connnect db success')
    })
    .catch((err) => {
        console.log("Error DB: ", err)
    })

    


  