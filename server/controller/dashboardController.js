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

const getEquipmentsData = async(req,res)=>{
  try {
    console.log(req.query)
    // let from = 1689724800000
    // let to = 1689811200000
    let from
    let to
    if(!isNaN(req.query.from)){
      from = new Date(Number(req.query.from))
    }
    if (!isNaN(req.query.to)){
      to = new Date(Number(req.query.to))
    }
    let equipments
    if ((req.query.from === "NaN") && (req.query.city === "")) {
      equipments = await equipments_data.find({});
    }

    if (from && to && (req.query.city === "")){
      equipments = await equipments_data.find({ Date: { $gte: from, $lt: to } })
    }

    if (from && to && req.query.city ) {
      equipments = await equipments_data.find({ Date: { $gte: from, $lt: to } ,City:req.query.city})
    }
    if (req.query.city && (req.query.from === "NaN")) {
      equipments = await equipments_data.find({City: req.query.city })
    }

    // const equipments = await equipmentsModel.find().distinct("Name")
    res.json({ success: true, message: "Equipments data fetched successfully",equipments })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getSerialNumbers = async(req,res)=> {
  try {
    
    const serialNumbers = await weather_data.find({}).select("SerialNo -_id")
    res.json({ success: true, message: "serial numbers successfully", serialNumbers })


     
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = { getEquipmentsData, getSerialNumbers }