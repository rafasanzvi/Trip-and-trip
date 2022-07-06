const router = require('express').Router()

const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')

const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const { checkOwnerOrHIEROPHANT } = require('./../../middleware/is-owner')
const { rolesChecker } = require("./../../utils/roles-checker");

const uploaderConfig = require('./../../config/uploader.config')


router.get('/list', isLoggedIn, (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .select({ username: 1, role: 1 })
        .then(users => {
            console.log(roles)
            res.render('user/user-list', { users, roles })
        })
        .catch(err => console.log(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {
    res.send('No arriesgo')
})

router.get('/:id/edit', isLoggedIn, checkOwnerOrHIEROPHANT, (req, res, next) => {

    const { id } = req.params

    const promises = [
        User.findById(id).populate('plantsOfInterest'),
        Plant.find()
    ]

    Promise
        .all(promises)
        .then(([userData, plantsData]) => {

            console.log({ userData, plantsData })

            res.render('user/user-edit', { userData, plantsData })
        })
        .catch(err => next(new Error(err)))


})

router.post('/:id/edit', isLoggedIn, checkOwnerOrHIEROPHANT, uploaderConfig.single('avatar'), (req, res, next) => {

    const { email, username, interests, dateOfBirth, plantsOfInterest, purpose } = req.body

    let query = { email, username, interests, dateOfBirth, plantsOfInterest, purpose }

    if (req.file) {
        query = { ...query, $push: { avatar: req.file.path } }
    }

    const { id } = req.params

    User
        .findByIdAndUpdate(id, query, { new: true })
        .then(() => res.redirect('/users/:id'))
        .catch(err => console.log(err))


})








module.exports = router