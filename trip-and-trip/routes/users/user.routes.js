const router = require('express').Router()
const User = require('./../../models/Plant.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const uploaderConfig = require('./../../config/uploader.config')



router.get('/', (req, res, next) => {

})


router.get('/:id', (req, res, next) => {

})


router.get('/:id/edit', (req, res, next) => {

})


router.post('/:id/edit', (req, res, next) => {

})





module.exports = router