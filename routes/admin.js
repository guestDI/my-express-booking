var express = require('express');
var router = express.Router();

router.post('/admin/dashboard', function(req, res, next) {
  res.send('respond with a resource');
});