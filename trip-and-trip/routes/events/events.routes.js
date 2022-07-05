const router = require('express').Router()

const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
//Cloudinary
const uploaderConfig = require('./../../config/uploader.config')


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
            console.log(plants)
            res.render('events/event-create', { plants, organizer })
        })
        .catch(err => next(new Error(err)))

})

router.post('/events/create', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const creator = req.session.currentUser
    const { date, plants, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const editEvent = { organizer: creator._id, date, plants, description, location, imageURL: req.file.path }
    console.log(editEvent)

    Event
        .create(editEvent)
        .then(event => {
            res.redirect('/events')
        })
        .catch(err => next(new Error(err)))


})

router.get('/events/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer')
        .populate('plants')
        .populate('attendees')
        .then(eventData => res.render('events/event-details', eventData))
        .catch(err => next(new Error(err)))
})

router.get('/events/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer plants')
        .then(eventEdition => {
            console.log(eventEdition)
            Plant
                .find()
                .then(plantsData => {
                    const allInfo = { eventEdition, plantsData }
                    return allInfo

                })
        })
        .then(data => {
            res.render('events/event-edit', data)
        })
        .catch(err => next(new Error(err)))
})

router.post('/events/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const { id } = req.params
    const { date, plants, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const newEvent = { date, plants, description, location }

    Event
        .findByIdAndUpdate(id, newEvent)
        .then(event => {
            console.log(event)
            res.redirect('/events')
        })
        .catch(err => next(new Error(err)))
})

router.post('/events/:id/join', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const joiner = req.session.currentUser

    Event
        .findByIdAndUpdate(id, { $push: { attendees: joiner._id } })
        .then(eventJoined => {
            console.log(eventJoined)
            res.redirect('/events')
        })
        .catch(err => next(new Error(err)))

})

router.post('/events/:id/delete', checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/events'))
        .catch(err => next(new Error(err)))


})

module.exports = router