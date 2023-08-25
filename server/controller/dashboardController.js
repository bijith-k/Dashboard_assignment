const equipmentsModel = require('../models/equipmentsDataModel')
const weatherModel = require('../models/weatherDataModel')
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
    const equipments = await equipmentsModel.find()
    const weather = await weatherModel.find()
  } catch (error) {
    
  }
}

module.exports = {getEquipmentsData}