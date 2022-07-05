const router = require('express').Router()
const Plant = require('./../../models/Plant.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const uploaderConfig = require('./../../config/uploader.config')



router.get('/plants', isLoggedIn, (req, res, next) => {

    Plant
        .find()
        .then(plants => {
            res.render('plant/plants-list', { plants })
        })
        .catch(err => console.log(err))
})

router.get('/plants/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    res.render('plant/new-plant')
})

router.post('/plants/create', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, properties, description } = req.body

    Plant
        .create({ sName, cName, region, culture, properties, description, imageURL: req.file.path })
        .then(() => {
            res.redirect('/plants')
        })
        .catch(err => console.log(err))
})

router.get('/plants/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-details', plant))
        .catch(err => console.log(err))

})

router.get('/plants/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-edit', plant))
        .catch(err => console.log(err))
})

router.post('/plants/:id/edit', isLoggedIn, uploaderConfig.single('img'), checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, files, properties, description } = req.body

    let query = { sName, cName, region, culture, files, properties, description }

    if (req.file) {
        query = { ...query, $push: { imageURL: req.file.path } }
    }

    const { id } = req.params

    Plant
        .findByIdAndUpdate(id, query, { new: true })
        .then(plant => res.render('plant/plants-details', plant))
        .catch(err => console.log(err))

})

router.get('/plants/:id/delete', checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findByIdAndDelete(id)
        .then(() => res.redirect('/plants'))
        .catch(err => console.log(err))
})

router.get('/api/plants', (req, res, next) => {

})

module.exports = router