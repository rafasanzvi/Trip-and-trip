const router = require('express').Router()
const User = require('./../../models/User.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const uploaderConfig = require('./../../config/uploader.config')


router.get('/list', (req, res, next) => {
    User
        .find()
        .select({ username: 1, role: 1 })
        .then(users => {
            res.render('user/user-list', { users })
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(userData => res.render('user/user-edit'))
        .catch(err => console.log(err))
})


router.post('/:id/edit', (req, res, next) => {

    /* const { email, username, interests, dateOfBirth, avatar, plantsOfInterest, purpose } */

})


router.get('/:id', (req, res, next) => {

})








module.exports = router