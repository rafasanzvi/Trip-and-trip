const router = require('express').Router()
const mongoose = require('mongoose')

const Plant = require('./../../models/Plant.model')

const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')

const { formatErrorMessage } = require("./../../utils/format-error-message")
const uploaderConfig = require('./../../config/uploader.config')



router.get('/', isLoggedIn, (req, res, next) => {

    Plant
        .find()
        .select({ cName: 1, sName: 1, region: 1, imageURL: 1 })
        .then(plants => res.render('plant/plants-list', { plants }))
        .catch(err => console.log(err))

})

router.get('/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    res.render('plant/new-plant')

})

router.post('/create', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, properties, description } = req.body

    let query = { sName, cName, region, culture, properties, description }

    if (req.file) {
        query = { ...query, $push: { imageURL: req.file.path } }
    }

    Plant
        .create({ query })
        .then(() => {
            res.redirect('/plants')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('plant/new-plant', { errorMessage: formatErrorMessage(error) })
            } else {
                next(new Error(error))
            }
        })

})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-details', plant))
        .catch(err => console.log(err))

})

router.get('/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-edit', plant))
        .catch(err => console.log(err))

})

router.post('/:id/edit', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, files, properties, description } = req.body

    let query = { sName, cName, region, culture, files, properties, description }

    if (req.file) {
        query = { ...query, $push: { imageURL: req.file.path } }
    }

    const { id } = req.params

    Plant
        .findByIdAndUpdate(id, query, { new: true })
        .then(plant => res.render('plant/plants-details', plant))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('validated-form', { errorMessage: formatErrorMessage(error) })
            } else {
                next(new Error(error))
            }
        })

})

router.get('/:id/delete', checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findByIdAndDelete(id)
        .then(() => res.redirect('/plants'))
        .catch(err => console.log(err))

})

module.exports = router