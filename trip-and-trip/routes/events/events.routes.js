const router = require('express').Router()
const mongoose = require('mongoose')

const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')

const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')

const { formatErrorMessage } = require("./../../utils/format-error-message")
const uploaderConfig = require('./../../config/uploader.config')


router.get('/', isLoggedIn, (req, res, next) => {
    Event
        .find()
        .populate('organizer')
        .select({ organizer: 1, description: 1, date: 1 })
        .then(events => res.render('events/event-list', { events }))
        .catch(err => next(new Error(err)))

})

router.get('/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const organizer = req.session.currentUser

    Plant
        .find()
        .select({ cName: 1 })
        .then(plants => {
            res.render('events/event-create', { plants, organizer })
        })
        .catch(err => next(new Error(err)))

})

router.post('/create', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {
    const { currentUser } = req.session
    const { date, plants, description, latitude, longitude } = req.body

    const location = {

        type: 'Point',
        coordinates: [latitude, longitude]
    }

    let query = { date, plants, description, location }

    if (req.file) {
        query = { ...query, $push: { imageURL: req.file.path } }
    }


    const editEvent = { ...query, organizer: currentUser._id }

    Event
        .create(editEvent)
        .then(() => {
            res.redirect('/events')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/event-create', { errorMessage: formatErrorMessage(error) })
            } else {
                next(new Error(error))
            }
        })
})

router.get("/map", (req, res, next) => {

    res.render("map/place-map")
})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer plants attendees')
        .then(eventData => res.render('events/event-details', eventData))
        .catch(err => next(new Error(err)))
})

router.get('/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

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



router.post('/:id/edit', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

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
            res.redirect(`/events/${id}`)
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('validated-form', { errorMessage: formatErrorMessage(error) })
            } else {
                next(new Error(error))
            }
        })
})

router.post('/:id/join', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { currentUser } = req.session

    Event
        .findByIdAndUpdate(id, { $push: { attendees: currentUser._id } })
        .then(() => {
            res.redirect(`/events/${id}`)
        })
        .catch(err => next(new Error(err)))

})

router.post('/:id/delete', checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/events'))
        .catch(err => next(new Error(err)))
})



module.exports = router