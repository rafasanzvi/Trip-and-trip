const router = require("express").Router()


const apiEventRouter = require('./api.events.routes')
router.use('/', apiEventRouter)

const apiPlantRouter = require('./api.plants.routes')
router.use('/', apiPlantRouter)




module.exports = router