const { getEquipmentsData, getSerialNumbers } = require('../controller/dashboardController')

const router = require('express').Router()


router.get('/equipments-data', getEquipmentsData)
router.get('/getSerialNumbers',getSerialNumbers)



module.exports = router