const express = require('express')
const router = express.Router()

router.post('/register', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/logout', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/users/me', function (req, res, next) {
  res.send('respond with a resource')
})

router.put('/users/me', function (req, res, next) {
  res.send('respond with a resource')
})

router.delete('/users/me', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
