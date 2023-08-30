const mongoose = require('mongoose')


const equipment_dataSchema = new mongoose.Schema({
  'Serial No.': {
    type: Number
  },
  City: {
    type: String
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
    type: Number,
  },
  encrypted_data:{
    type:String
  }
})

equipment_dataSchema.index({ Date: 1 })
equipment_dataSchema.index({ City: 1 })


module.exports = mongoose.model('equipments_dat', equipment_dataSchema, 'equipments_dat')