const router = require("express").Router()

const baseRouter = require('./base/base.routes')
router.use('/', baseRouter)

const authRouter = require('./auth/auth.routes')
router.use('/', authRouter)

const adminRouter = require('./admin/admin.routes')
router.use('/admin', adminRouter)

const mapRouter = require('./map/map.routes')
router.use('/', mapRouter)

const eventRouter = require('./events/events.routes')
router.use('/events', eventRouter)

const plantRouter = require('./plant/plant.routes')
router.use('/plants', plantRouter)

const userRouter = require('./users/user.routes')
router.use('/users', userRouter)

const apiRouter = require('./api/api.routes')
router.use('/api', apiRouter)

module.exports = router