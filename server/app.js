require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/classic_fox_live_code_1`, { useNewUrlParser : true})

app.use(cors())
app.use(express.urlencoded({ extended : false}))
app.use(express.json())

app.use(routes)







app.listen(port, ()=> {
  console.log(`listening on port :${port}`)
})