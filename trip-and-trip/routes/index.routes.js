const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*Auth routes*/
const authRouter = require('./auth/auth.routes')
router.use('/', authRouter)

/*Plant routes*/

const plantRouter = require('./plant/plant.routes')
router.use('/', plantRouter)

module.exports = router;
