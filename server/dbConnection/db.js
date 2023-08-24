const mongoose = require('mongoose')


const dbConnection = async() =>{
  mongoose.set("strictQuery",false)
  try{
    mongoose.connect(process.env.DB_CONNECTION,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    }).then(()=>{
      console.log("Database connected")
    }).catch((err)=>{
      console.log("Database error",err.message)
    })
  }catch(error){
    console.log("Database error",error)
  }
}

module.exports = dbConnection;
