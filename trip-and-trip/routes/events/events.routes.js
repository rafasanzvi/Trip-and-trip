const router = require('express').Router()
const Event = require('./../../models/Event.model')

router.get('/events', (req, res, next) => {
    res.render('events/event-list')
})

router.get('/events/create', (req, res, next) => {
    res.send('H')
})

router.post('/events/create', (req, res, next) => {
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