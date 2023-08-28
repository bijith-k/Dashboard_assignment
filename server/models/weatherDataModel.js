const mongoose = require('mongoose')


const weather_dataSchema = new mongoose.Schema({
  TimeStamp: {
    type: String
  },
  temp: {
    type: Number
  },
  humidity: {
    type: Number
  },
  dew_point: {
    type: Number
  },
  precipitation: {
    type: Number
  },
  pressure: {
    type: Number
  },
  wind_speed: {
    type: Number
  },
  SerialNo: {
    type: Number
  }
})

module.exports = mongoose.model("weather_data", weather_dataSchema, "weather_data")