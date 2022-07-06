const router = require('express').Router()
const Plant = require('./../../models/Plant.model')
const User = require('./../../models/User.model')
const Comment = require('./../../models/Comment.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const { checkOwnerOrHIEROPHANT } = require('./../../middleware/is-owner')
const { rolesChecker } = require("./../../utils/roles-checker");
const { formatDate } = require("./../../utils/format-date")
const uploaderConfig = require('./../../config/uploader.config')



router.get('/list', isLoggedIn, (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .select({ username: 1, role: 1 })
        .then(users => {
            res.render('user/user-list', { users, roles })
        })
        .catch(err => console.log(err))
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
        .populate('plantsOfInterest')
        .then(user => res.redirect(`/users/${id}`))
        .catch(err => console.log(err))


})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const promises = [
        User.findById(id).populate('plantsOfInterest comments'),
        Comment.find().populate('commenter')
    ]

    Promise
        .all(promises)
        .then(([userData, commentData]) => {

            const formattedDate = formatDate(userData.dateOfBirth)

            let formattedUserData = { ...userData._doc, dateOfBirth: formattedDate }

            res.render('user/user-details', { userData: formattedUserData, commentData })
        })
        .catch(err => next(new Error(err)))

})

router.post('/:id/comment', isLoggedIn, (req, res, next) => {

    const { currentUser } = req.session
    const { id } = req.params
    const { content } = req.body

    const editComment = { commenter: currentUser._id, content }
    console.log(editComment)

    Comment
        .create(editComment)
        .then(comment => User.findByIdAndUpdate(id, { $push: { comments: comment._id } }).populate('comments'))
        .then(() => res.redirect(`/users/${id}`))
        .catch(err => console.log(err))


})


module.exports = router