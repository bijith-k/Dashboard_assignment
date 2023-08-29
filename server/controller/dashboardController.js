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
    if (!isNaN(req.query.from)) {
      from = new Date(Number(req.query.from))
    }
    if (!isNaN(req.query.to)) {
      to = new Date(Number(req.query.to))
    }
    let equipments
    if ((req.query.from === "NaN") && (req.query.city === "")) {
      equipments = await equipments_data.find({});
    }

    if (from && to && (req.query.city === "")) {
      equipments = await equipments_data.find({ Date: { $gte: from, $lt: to } })
    }

    if (from && to && req.query.city) {
      equipments = await equipments_data.find({ Date: { $gte: from, $lt: to }, City: req.query.city })
    }
    if (req.query.city && (req.query.from === "NaN")) {
      equipments = await equipments_data.find({ City: req.query.city })
    }


    res.json({ success: true, message: "Equipments data fetched successfully", equipments })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getSerialNumbers = async (req, res) => {
  try {

    const serialNumbers = await weather_data.find({}).select("SerialNo -_id")
    res.json({ success: true, message: "serial numbers successfully", serialNumbers })



  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getTempAndHumidityData = async (req, res) => {
  try {
    //  console.log(req.query)
    // const from = new Date(req.query.from?.year, req.query.from?.month - 1, req.query.from?.day);
    // const to = new Date(req.query.to?.year, req.query.to?.month - 1, req.query.to?.day);
    // function formatDate(date) {
    //   const day = date.day < 10 ? `0${date.day}` : date.day;
    //   const month = date.month < 10 ? `0${date.month}` : date.month;
    //   const formattedDate = `${day}-${month}-${date.year}`;
    //   return formattedDate;
    // }

    let fromISODate;
    let toISODate;

    if (req.query.from) {
      // from = new Date(formatDate(req.query.from) + " 00:00") ;
      fromISODate = new Date(
        Date.UTC(
          parseInt(req.query.from?.year, 10),
          parseInt(req.query.from?.month, 10) - 1,
          parseInt(req.query.from?.day, 10)
        )
      ).toISOString();
    }

    if (req.query.to) {
      // to = new Date(formatDate(req.query.to) + " 23:59") ;
      // to = new Date(formatDate(req.query.from) + " 23:59");
      toISODate = new Date(
        Date.UTC(
          parseInt(req.query.to?.year, 10),
          parseInt(req.query.to?.month, 10) - 1,
          parseInt(req.query.to?.day, 10)
        )
      ).toISOString();

    }

    // const fromDate = new Date(`${req.query.from.year}-${req.query.from.month}-${req.query.from.day}`);
    // const toDate = new Date(`${req.query.to.year}-${req.query.to.month}-${req.query.to.day}`);
    // const fromYear = req.query.from.year;
    // const fromMonth = req.query.from.month;
    // const fromDay = req.query.from.day;

    // const toYear = req.query.to.year;
    // const toMonth = req.query.to.month;
    // const toDay = req.query.to.day;

    // const fromDate = new Date(
    //   Date.UTC(
    //     parseInt(fromYear),
    //     parseInt(fromMonth), // JavaScript months are 0-based
    //     parseInt(fromDay),
    //     // 0, 0, 0 // Set hours, minutes, and seconds to 0
    //   )
    // );

    // const toDate = new Date(
    //   Date.UTC(
    //     parseInt(toYear),
    //     parseInt(toMonth),
    //     parseInt(toDay),
    //     // 23, 59, 59 // Set hours, minutes, and seconds to the end of the day
    //   )
    // );





    // console.log(req.query,from ,to)
    // let from
    // let to
    // if (!isNaN(req.query.from)) {
    //   from = new Date(Number(req.query.from))
    // }
    // if (!isNaN(req.query.to)) {
    //   to = new Date(Number(req.query.to))
    // }
    console.log(fromISODate, toISODate)

    let weatherData
    console.log(req.query.serialNo !== "0", req.query.serialNo !== "")
    console.log(req.query.serialNo !== "0" || req.query.serialNo !== "")
    if (!isNaN(req.query.serialNo) && req.query.serialNo !== "0" && req.query.serialNo !== "" && !fromISODate && !toISODate) {
      console.log("Scenario 0", parseInt(req.query.serialNo));
      weatherData = await weather_data.find({ SerialNo: parseInt(req.query.serialNo) });
    } else if (fromISODate && toISODate && (req.query.serialNo == '0' || req.query.serialNo == '')) {
      console.log("Scenario 1",);
      weatherData = await weather_data.find({
        TimeStamp: {
          $gte: fromISODate,
          $lte: toISODate
        }
      });
    } else if (fromISODate && toISODate && !isNaN(req.query.serialNo) && req.query.serialNo !== '0' && req.query.serialNo !== "") {
      // console.log("Scenario 2", from, to, req.query.serialNo);
      weatherData = await weather_data.find({ TimeStamp: { $gte: fromISODate, $lte: toISODate }, SerialNo: req.query.serialNo });
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

module.exports = { getEquipmentsData, getSerialNumbers, getTempAndHumidityData }