const router = require('express').Router()
const Event = require('./../../models/Event.model')
const Plant = require('./../../models/Plant.model')


router.get('/events', (req, res, next) => {
    res.render('events/event-list')
})

router.get('/events/create', (req, res, next) => {
    Plant
        .find()
        .then(plants => {
            console.log(plants)
            res.render('events/event-create', { plants })
        })
        .catch((err) => console.log(err))

})

router.post('/events/create', (req, res, next) => {
    // const { id } = req.session.currentUser._id
    const { date, plants, description } = req.body

    Event
        .create({ date, plants, description })
        .then(event => res.send(event))
        .catch((err) => console.log(err))


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