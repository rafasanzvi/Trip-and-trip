const router = require("express").Router()

const User = require("../../models/User.model")

router.post('/:id/initiate', (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'INITIATE' })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(new Error(err)))
})


router.post('/:id/elevate', (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'CHAMAN' })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(new Error(err)))
})

module.exports = router