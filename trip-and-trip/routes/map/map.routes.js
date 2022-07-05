const router = require("express").Router()
const Event = require('./../../models/Event.model')

router.get("/basic", (req, res, next) => res.render("map/map-basic"))



module.exports = router