const router = require("express").Router()

const Plant = require('./../../models/Plant.model')

const { isLoggedIn } = require('./../../middleware/session-guard')

router.get('/plants', isLoggedIn, (req, res, next) => {

    Plant
        .find()
        .then(plants => res.json(plants))
        .catch(err => res.json({ Message: 'server error', err }))
})

module.exports = router