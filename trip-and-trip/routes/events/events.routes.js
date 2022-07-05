const router = require('express').Router()

const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
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
            res.render('events/event-create', { plants, organizer })
        })
        .catch(err => next(new Error(err)))

})

router.post('/events/create', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const { currentUser } = req.session
    const { date, plants, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const editEvent = { organizer: currentUser._id, date, plants, description, location, imageURL: req.file.path }

    Event
        .create(editEvent)
        .then(() => {
            res.redirect('/events')
        })
        .catch(err => next(new Error(err)))
})

router.get('/events/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer plants attendees')
        .then(eventData => res.render('events/event-details', eventData))
        .catch(err => next(new Error(err)))
})

router.get('/events/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    const promises = [
        Event.findById(id).populate('organizer plants'),
        Plant.find()
    ]

    Promise
        .all(promises)
        .then(([eventEdition, plantsData]) => {

            console.log({ eventEdition, plantsData })

            res.render('events/event-edit', { eventEdition, plantsData })
        })
        .catch(err => next(new Error(err)))
})



router.post('/events/:id/edit', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params
    const { date, plants, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }


    let query = { date, plants, description, location }

    if (req.file) {
        query = { ...query, $push: { imageURL: req.file.path } }
    }



    Event
        .findByIdAndUpdate(id, query)
        .then(() => {
            res.redirect('/events')
        })
        .catch(err => next(new Error(err)))
})

router.post('/events/:id/join', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { currentUser } = req.session

    Event
        .findByIdAndUpdate(id, { $push: { attendees: currentUser._id } })
        .then(() => {
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