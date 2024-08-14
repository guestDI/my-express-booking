const express = require('express');
const router = express.Router();

router.get('/dashboard', function (req, res, next) {
  res.send('respond with a resource');
});
