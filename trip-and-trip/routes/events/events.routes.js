const router = require('express').Router()
const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')
const { isLoggedIn } = require('./../../middleware/session-guard')


router.get('/events', (req, res, next) => {
    res.render('events/event-list')
})

router.get('/events/create', isLoggedIn, (req, res, next) => {
    const organizer = req.session.currentUser
    Plant
        .find()
        .then(plants => {
            console.log(organizer)
            res.render('events/event-create', { plants, organizer })
        })
        .catch((err) => console.log(err))

})

router.post('/events/create', isLoggedIn, (req, res, next) => {
    const organizer = req.session.currentUser._id
    const { date, plants, description } = req.body
    console.log(organizer)


    // Event
    //     .create({ date, plants, description })

    //     .then(event => {
    //         res.send(event)
    //     })
    //     .catch((err) => console.log(err))


})

router.get('/events/:id', (req, res, next) => {
})

router.post('/events/:id', (req, res, next) => {
})

router.get('/events/:id/edit', (req, res, next) => {
})

router.post('/events/:id/edit', (req, res, next) => {
})

router.post('/events/:id/join', (req, res, next) => {

})

router.post('/events/:id/delete', (req, res, next) => {

})

module.exports = router