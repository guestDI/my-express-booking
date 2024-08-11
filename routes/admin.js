const express = require('express')
const router = express.Router()

router.post('/admin/dashboard', function (req, res, next) {
  res.send('respond with a resource')
})
