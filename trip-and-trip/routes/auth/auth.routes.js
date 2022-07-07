const router = require('express').Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const User = require('./../../models/User.model')

const { isLoggedOut } = require('./../../middleware/session-guard')
const { formatErrorMessage } = require("./../../utils/format-error-message")
const saltRounds = 10


router.get('/register', isLoggedOut, (req, res, next) => {

    res.render('auth/auth-register')
})


router.post('/register', (req, res, next) => {

    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(() => res.redirect('/login'))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('auth/auth-register', { errorMessage: formatErrorMessage(error) })
            } else {
                next(new Error(error))
            }
        })
})


router.get('/login', isLoggedOut, (req, res, next) => {

    res.render('auth/auth-login')
})


router.post('/login', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/auth-login', { errorMessage: 'Email not registered' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/auth-login', { errorMessage: 'Incorrect password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/plants')
            }
        })
        .catch(error => next(error))

})


router.post('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))

})

module.exports = router