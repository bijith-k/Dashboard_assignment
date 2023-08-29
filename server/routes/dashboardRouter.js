const { getEquipmentsData, getSerialNumbers, getTempAndHumidityData, getCities } = require('../controller/dashboardController')

const router = require('express').Router()


router.get('/equipments-data', getEquipmentsData)
router.get('/getCities', getCities)
router.get('/getSerialNumbers',getSerialNumbers)
router.get('/getTempAndHumidity',getTempAndHumidityData)


module.exports = router