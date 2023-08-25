const { getEquipmentsData } = require('../controller/dashboardController')

const router = require('express').Router()


router.get('/equipments-data',getEquipmentsData)



module.exports = router