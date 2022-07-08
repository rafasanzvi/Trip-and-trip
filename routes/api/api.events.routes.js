const router = require("express").Router()

const Event = require('./../../models/Event.model')

const { isLoggedIn } = require('./../../middleware/session-guard')

router.get('/events', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => res.json({ Message: 'server error', err }))
})

module.exports = router