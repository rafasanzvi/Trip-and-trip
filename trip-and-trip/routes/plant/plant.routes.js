const router = require('express').Router()
const Plant = require('./../../models/Plant.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')

const { isLoggedIn } = require('./../../middleware/session-guard')


router.get('/plants', isLoggedIn, (req, res, next) => {

    Plant
        .find()
        .then(plants => {
            res.render('plant/plants-list', { plants })
        })
        .catch(err => console.log(err))
})

router.get('/plants/create', isLoggedIn, (req, res, next) => {

    res.render('plant/new-plant')
})

router.post('/plants/create', isLoggedIn, (req, res, next) => {

    const { sName, cName, region, culture, files, properties, description } = req.body
    const createPlant = req.body

    Plant
        .create(createPlant)
        .then(res.redirect('/plants'))
        .catch(err => console.log(err))
})

router.get('/plants/:id', (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => {

            res.render('plant/plants-details', plant)
        })
        .catch(err => console.log(err))

})

router.get('/plants/:id/edit', (req, res, next) => {

    const { id } = req.params

    /* Plant
        .findById(id)
        .then(plant => {

        }) */

})

router.post('/plants/:id/edit', (req, res, next) => {

})

router.post('/plants/:id/delete', (req, res, next) => {

})

router.get('/api/plants', (req, res, next) => {

})











module.exports = router