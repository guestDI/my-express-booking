const express = require('express')
const router = express.Router()

// administrator rights
router.post('/rooms', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/rooms', function (req, res, next) {
  res.send('respond with a resource')
})

router.put('/rooms/:id', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/rooms/:id', function (req, res, next) {
  res.send('respond with a resource')
})

router.delete('/rooms/:id', function (req, res, next) {
  res.send('respond with a resource')
})

// general rights

module.exports = router
