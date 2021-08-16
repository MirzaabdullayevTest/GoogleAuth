const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/authMiddleware')

//@desc  Login/landing page
//@route GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
        title: 'Login'
    })
})

//@desc  Dashboard
//@route GET /dashboard
router.get('/dashboard', checkAuth, (req, res) => {
    console.log(req.user);
    res.render('dashboard', {
        title: 'Dashboard',
        name: req.user.firstName
    })
})

module.exports = router