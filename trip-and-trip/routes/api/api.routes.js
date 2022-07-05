const router = require("express").Router()

const Event = require('./../../models/Event.model')

router.get('/events', (req, res, next) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => res.json({ Message: 'server error', err }))
})

module.exports = router