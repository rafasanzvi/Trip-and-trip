const router = require('express').Router()

const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')

const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')


router.get('/events', isLoggedIn, (req, res, next) => {
    Event
        .find()
        .populate('organizer')
        .then(events => res.render('events/event-list', { events }))
        .catch(err => next(new Error(err)))

})

router.get('/events/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const organizer = req.session.currentUser
    Plant
        .find()
        .then(plants => {
            console.log(organizer)
            res.render('events/event-create', { plants, organizer })
        })
        .catch(err => next(new Error(err)))

})

router.post('/events/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const creator = req.session.currentUser
    const { date, plants, description } = req.body



    Event
        .create({ organizer: creator._id, date, plants, description })
        .then(event => {
            res.render('events/event-list')
        })
        .catch(err => next(new Error(err)))


})

router.get('/events/:id', (req, res, next) => {
    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer')
        .then(eventData => res.render('events/event-details', eventData))
        .catch(err => next(new Error(err)))
})

router.get('/events/:id/edit', (req, res, next) => {
    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer')
        .then(eventEdition => {
            console.log(eventEdition)
            res.render('events/event-edit', eventEdition)
        })
        .catch(err => next(new Error(err)))
})

router.post('/events/:id/edit', (req, res, next) => {
})

router.post('/events/:id/join', (req, res, next) => {

})

router.post('/events/:id/delete', (req, res, next) => {

})

module.exports = router