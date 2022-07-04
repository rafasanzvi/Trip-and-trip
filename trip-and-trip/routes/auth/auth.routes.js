const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('./../../models/user.model')
const saltRounds = 10


router.get('/register', (req, res, next) => {
    res.render('auth/auth-register')
})


router.post('/register', (req, res, next) => {
    const { userPwd } = req.body


    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


router.get('/login', (req, res, next) => {

    res.render('auth/auth-login')

})


router.post('/login', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/auth-login', { errorMessage: 'Email not registered in the database' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/auth-login', { errorMessage: 'Incorrect password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))

})


router.post('/logout', (req, res, next) => {

})




module.exports = router