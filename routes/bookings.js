const express = require('express')
const router = express.Router()

router.post('/bookings', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/bookings', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/bookings/:id', function (req, res, next) {
  res.send('respond with a resource')
})

router.put('/bookings/:id', function (req, res, next) {
  res.send('respond with a resource')
})
