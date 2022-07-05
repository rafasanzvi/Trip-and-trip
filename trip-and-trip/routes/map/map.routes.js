const router = require("express").Router();

router.get("/basic", (req, res, next) => res.render("map/map-basic"))

module.exports = router;