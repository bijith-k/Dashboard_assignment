const mongoose = require('mongoose')


const equipments_dataSchema = new mongoose.Schema({
  'Serial No.': {
    type:Number
  },
  City:{
    type:String
  },
  Capacity: {
    type: Number
  },
  Status: {
    type: String
  },
  Units: {
    type: Number
  },
  Efficiency: {
    type: Number
  },
  Name: {
    type: String
  },
  Description: {
    type: String
  },
  Recommendation: {
    type: String
  },
  Date: {
    type: Date,
  }
})


module.exports = mongoose.model('equipments_data', equipments_dataSchema,'equipments_data')