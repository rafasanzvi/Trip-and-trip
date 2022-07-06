const router = require("express").Router()

const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')


const User = require("../../models/User.model")

router.post('/:id/initiate', isLoggedIn, checkRole('HIEROPHANT'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'INITIATE' })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(new Error(err)))
})


router.post('/:id/elevate', isLoggedIn, checkRole('HIEROPHANT'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'CHAMAN' })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(new Error(err)))
})

module.exports = router