const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require('./auth/auth.routes')
router.use('/', authRouter)

const eventRouter = require('./events/events.routes')
router.use('/', eventRouter)

module.exports = router;
