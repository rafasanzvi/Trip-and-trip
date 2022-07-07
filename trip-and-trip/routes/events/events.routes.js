const router = require('express').Router()
const mongoose = require('mongoose')

const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')
const Comment = require('./../../models/Comment.model')


const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')

const { formatErrorMessage } = require("./../../utils/format-error-message")
const { formatDate } = require("./../../utils/format-date")
const { rolesChecker } = require("./../../utils/roles-checker");

const uploaderConfig = require('./../../config/uploader.config')



router.get('/', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .populate('organizer')
        .select({ organizer: 1, description: 1, date: 1 })
        .then(eventsData => {


            let newDates = []

            eventsData.forEach(elem => {

                let formattedDate = formatDate(elem.date)
                let formattedElemData = { ...elem._doc, date: formattedDate }
                console.log({ ...elem })
                newDates.push(formattedElemData)

            })

            res.render('events/event-list', { newDates })
        })
        .catch(err => next(new Error(err)))

})

router.get('/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const organizer = req.session.currentUser

    Plant
        .find()
        .select({ cName: 1 })
        .then(plants => res.render('events/event-create', { plants, organizer }))
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
        query = { ...query, imageURL: req.file.path }
    }

    const editEvent = { ...query, organizer: currentUser._id }

    Event
        .create(editEvent)
        .then(() => res.redirect('/events'))
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

    const roles = rolesChecker(req.session.currentUser)

    let formattedEventData

    Event
        .findById(id)
        .populate('organizer plants attendees comments')
        .then(eventData => {
            const formattedDate = formatDate(eventData.date)
            formattedEventData = { ...eventData._doc, date: formattedDate }
            return Comment.find({ commentedPlace: eventData.description }).populate('commenter')
        })
        .then(commentData => {
            res.render('events/event-details', { eventData: formattedEventData, commentData, roles })
        })
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
        .then(() => res.redirect(`/events/${id}`))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/event-edit', { errorMessage: formatErrorMessage(error) })
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
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(new Error(err)))

})

router.post('/:id/comment', isLoggedIn, (req, res, next) => {

    const { currentUser } = req.session
    const { id } = req.params
    const { content } = req.body
    let editComment = { commenter: currentUser._id, content }

    Event
        .findById(id)
        .then(eventData => {
            editComment = { ...editComment, commentedPlace: eventData.description }
            return Comment.create(editComment)
        })
        .then(comment => Event.findByIdAndUpdate(id, { $push: { comments: comment._id } }).populate('comments'))
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => console.log(err))


    // Comment
    //     .create(editComment)
    //     .then(comment => Event.findByIdAndUpdate(id, { $push: { comments: comment._id } }).populate('comments'))
    //     .then(() => res.redirect(`/events/${id}`))
    //     .catch(err => console.log(err))

})

router.post('/:id/delete', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/events'))
        .catch(err => next(new Error(err)))
})



module.exports = router