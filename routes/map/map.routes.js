const router = require("express").Router()
const Event = require('./../../models/Event.model')

router.get("/events/map", (req, res, next) => {

    res.render("map/place-map")
})

module.exports = router