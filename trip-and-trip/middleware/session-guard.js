const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('auth/auth-login', { errorMessage: 'Login to continue' })
    }
    next()
}

module.exports = { isLoggedIn }