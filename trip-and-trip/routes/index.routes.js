const router = require("express").Router();



const baseRouter = require('./base/base.routes')
router.use('/', baseRouter)
/*Auth routes*/
const authRouter = require('./auth/auth.routes')
router.use('/', authRouter)

const eventRouter = require('./events/events.routes')
router.use('/', eventRouter)
/*Plant routes*/

const plantRouter = require('./plant/plant.routes')
router.use('/', plantRouter)

module.exports = router;
