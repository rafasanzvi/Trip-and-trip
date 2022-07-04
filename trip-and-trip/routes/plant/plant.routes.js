const router = require('express').Router()

const Plant = require('./../../models/Plant.model')


router.get('/plants', (req, res, next) => {

    Plant
        .find()
        .then(plants => {
            res.render('plant/plants-list', { plants })
        })
        .catch(err => console.log(err))
})

router.get('/plants/create', (req, res, next) => {

    res.render('plant/new-plant')
})

router.post('/plants/create', (req, res, next) => {

    const { scientificName, commonName, region, cultures, files, types, description } = req.body
    const createPlant = req.body

    /* Plant
        .create() */



})

router.get('/plants/:id', (req, res, next) => {

})

router.get('/plants/:id/edit', (req, res, next) => {

})

router.post('/plants/:id/edit', (req, res, next) => {

})

router.post('/plants/:id/delete', (req, res, next) => {

})

router.get('/api/plants', (req, res, next) => {

})











module.exports = router