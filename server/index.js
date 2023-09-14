const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const logger = require('morgan')
const dashboardRouter = require('./routes/dashboardRouter')
const dbConnection = require('./dbConnection/db')

dbConnection()

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    methods:['GET','POST','PUT'],
    credentials:true
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/",dashboardRouter)

const server = app.listen(process.env.PORT,()=>{
  console.log(`Server started at PORT ${process.env.PORT}`)
})