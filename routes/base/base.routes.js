const router = require("express").Router();

router.get("/", (req, res, next) => {

    let isLoggedOut = false
    req.session.currentUser ? isLoggedOut = false : isLoggedOut = true

    res.render("index", { isLoggedOut });
});

module.exports = router;
