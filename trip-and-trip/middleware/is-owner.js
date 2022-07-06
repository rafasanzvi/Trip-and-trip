const checkOwnerOrHIEROPHANT = (req, res, next) => {

    const isOwner = req.params.id === req.session.currentUser._id
    const isHIEROPHANT = req.session.currentUser.role === 'HIEROPHANT'

    if (isOwner || isHIEROPHANT) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'You lack enlightenment to see this view.' })
    }
}

module.exports = { checkOwnerOrHIEROPHANT }