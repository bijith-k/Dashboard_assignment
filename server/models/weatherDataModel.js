const mongoose = require('mongoose')


const weather_dataSchema = new mongoose.Schema({
  TimeStamp: {
    type: Date
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

weather_dataSchema.index({ TimeStamp: 1 });
weather_dataSchema.index({ SerialNo: 1 });

module.exports = mongoose.model("weather_data", weather_dataSchema, "weather_data")