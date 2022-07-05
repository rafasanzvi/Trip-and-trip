const router = require("express").Router()

const baseRouter = require('./base/base.routes')
router.use('/', baseRouter)

const authRouter = require('./auth/auth.routes')
router.use('/', authRouter)

const mapRouter = require('./map/map.routes')
router.use('/maps', mapRouter)

const eventRouter = require('./events/events.routes')
router.use('/events', eventRouter)

const plantRouter = require('./plant/plant.routes')
router.use('/plants', plantRouter)

const userRouter = require('./users/user.routes')
router.use('/users', userRouter)

module.exports = router