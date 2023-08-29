const equipments_data = require('../models/equipmentsDataModel')
const weather_data = require('../models/weatherDataModel')
// const crypto = require('crypto')

// const decryptionKey = Buffer.from("b'\xe8+\xc4\xf9\xd5\x12\xda\xf4\xe5\xf7F\xd58A\xc8T)\x9a\xed\xa1I(#m\x9bZt\xf1\xd3\xe7q)'", 'hex'); // Convert key from hex to bytes

// const getEquipmentsData = async(req,res) => {
//  try {
//    console.log("first")
//    const equipments = await equipmentsModel.find()
//    const weather = await weatherModel.find()

//   //  const decryptedEquipmentsData = equipments.map(record => {
//   //    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(decryptionKey, 'base64'), Buffer.alloc(16));
//   //    let decryptedRecord = decipher.update(record.encrypted_data, 'hex', 'utf8');
//   //    decryptedRecord += decipher.final('utf8');
//   //    return JSON.parse(decryptedRecord);
//   //  });

//   //  const decryptedWeatherData = weather.map(record => {
//   //    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(decryptionKey, 'base64'), Buffer.alloc(16));
//   //    let decryptedRecord = decipher.update(record.encrypted_data, 'hex', 'utf8');
//   //    decryptedRecord += decipher.final('utf8');
//   //    return JSON.parse(decryptedRecord);
//   //  });

//    // Decryption function
//    const decryptData = (encryptedData, decryptionKey) => {
//      const iv = Buffer.from(`b'0123456789abcdef'`, 'hex');

//      const decipher = crypto.createDecipheriv('aes-256-cbc', decryptionKey, iv);
//      let decryptedRecord = decipher.update(Buffer.from(encryptedData, 'base64'), null, 'utf8');
//      decryptedRecord += decipher.final('utf8');
//      return JSON.parse(decryptedRecord);
//    };

//    // Decrypt equipments data
//    const decryptedEquipmentsData = equipments.map(record => {
//      return decryptData(record.encrypted_data, decryptionKey);
//    });

//    const decryptedWeatherData = weather.map(record => {
//      return decryptData(record.encrypted_data, decryptionKey);
//    });


//    console.log(decryptedEquipmentsData, decryptedWeatherData)
//    res.json({ decryptedEquipmentsData, decryptedWeatherData });

//  } catch (error) {
//   console.log(error)
//  }

// }

const getEquipmentsData = async (req, res) => {
  try {
    console.log(req.query)
    // let from = 1689724800000
    // let to = 1689811200000
    let from
    let to
    if (req.query.from != "") {
      from = Date.parse(req.query.from)
    }
    if (req.query.to !="") {
      to = Date.parse(req.query.to)
    }
    console.log(from,to)
    let equipments
    if (isNaN(from) && (req.query.city === "")) {
      equipments = await equipments_data.find({});
    }

    if (from && to && (req.query.city === "")) {
      equipments = await equipments_data.find({ Date: { $gte: from, $lte: to } })
    }

    if (from && to && req.query.city) {
      equipments = await equipments_data.find({ Date: { $gte: from, $lte: to }, City: req.query.city })
    }
    if (req.query.city && isNaN(from)) {
      equipments = await equipments_data.find({ City: req.query.city })
    }


    res.json({ success: true, message: "Equipments data fetched successfully", equipments })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getCities = async (req, res) => {
  try {
    const cities = await equipments_data.find({}).select("City -_id").distinct('City')
    res.json({ success: true, message: "cities fetched successfully", cities })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}


const getSerialNumbers = async (req, res) => {
  try {
    const serialNumbers = await weather_data.find({}).select("SerialNo -_id").distinct('SerialNo')
    res.json({ success: true, message: "serial numbers fetched successfully", serialNumbers })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getTempAndHumidityData = async (req, res) => {
  try {
     

    let from
    let to
    if (req.query.from != "") {
      from = req.query.from
    }
    if (req.query.to != "") {
      to = req.query.to
    }
 

    let weatherData
    
    if (!isNaN(req.query.serialNo) && req.query.serialNo !== "0" && req.query.serialNo !== "" && !from && !to) {
      console.log("Scenario 0", parseInt(req.query.serialNo));
      weatherData = await weather_data.find({ SerialNo: parseInt(req.query.serialNo) });
    } else if (from && to && (req.query.serialNo == '0' || req.query.serialNo == '')) {
      console.log("Scenario 1",);
      weatherData = await weather_data.find({
        TimeStamp: {
          $gte: from,
          $lte: to
        }
      });
    } else if (from && to && !isNaN(req.query.serialNo) && req.query.serialNo !== '0' && req.query.serialNo !== "") {
    
      weatherData = await weather_data.find({ TimeStamp: { $gte: from, $lte: to }, SerialNo: req.query.serialNo });
    } else {
      console.log("Scenario 3");
      weatherData = await weather_data.find({});
    }
    console.log(weatherData?.length)

    res.json({ success: true, message: "Weather data fetched successfully", weatherData })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = { getEquipmentsData, getSerialNumbers, getTempAndHumidityData, getCities }