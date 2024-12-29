const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credetials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

mongoose.connect(process.env.DB_URI)
.then(console.log('DB connected!'))
.catch(err => console.log(err))

const port = 4000
const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})