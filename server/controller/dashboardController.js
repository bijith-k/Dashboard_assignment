const equipments_data = require('../models/equipmentsDataModel')
const weather_data = require('../models/weatherDataModel')
// const crypto = require('crypto')
// const equipment_data = require('../models/eq')
// const fernet = require('fernet')

// const encryptionKey = Buffer.from('JPp_AfCib1eZEhP8-iu9L4r701897OCPhODqfmaUt_Q=', 'base64')
 

// async function decryptData(encryptedData) {
//   try {
     
//     const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.alloc(16, 0));
//     let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
//     decrypted += decipher.final('utf8');
//     console.log(decrypted)
//     return JSON.parse(decrypted);
//   } catch (error) {
//     console.error('Error decrypting data:', error);
//     throw error;
//   }
// }

// const getEquipmentData = async (req,res) => {
//   try {
//     const encryptedDataArray = await equipment_data.find().limit(1); // Change to Weather.find() if fetching weather data

     
//     const decryptedDataList = [];
//     for (const encryptedDataObj of encryptedDataArray) {
//       const decryptedData = await decryptData(encryptedDataObj.encrypted_data);
//       decryptedDataList.push(decryptedData);
//     }

//     console.log(decryptedDataList);
//   } catch (err) {
//     console.error('Error e:', err);
//   }
// }
 

const getEquipmentsData = async (req, res) => {
  try {
    let from
    let to
    if (req.query.from != "") {
      from = Date.parse(req.query.from)
    }
    if (req.query.to !="") {
      to = Date.parse(req.query.to)
    }
    
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
      weatherData = await weather_data.find({ SerialNo: parseInt(req.query.serialNo) });
    } else if (from && to && (req.query.serialNo == '0' || req.query.serialNo == '')) {
      weatherData = await weather_data.find({
        TimeStamp: {
          $gte: from,
          $lte: to
        }
      });
    } else if (from && to && !isNaN(req.query.serialNo) && req.query.serialNo !== '0' && req.query.serialNo !== "") {
    
      weatherData = await weather_data.find({ TimeStamp: { $gte: from, $lte: to }, SerialNo: req.query.serialNo });
    } else {
      weatherData = await weather_data.find({});
    }

    res.json({ success: true, message: "Weather data fetched successfully", weatherData })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = { getEquipmentsData, getSerialNumbers, getTempAndHumidityData, getCities }