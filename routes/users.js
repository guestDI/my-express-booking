const express = require('express')
const router = express.Router()
const userController = require('../controllers/users');
const validate = require('../middleware/validate');
import { check } from "express-validator";

router.post('/register', 
  check("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
  check("name")
      .not()
      .isEmpty()
      .withMessage("You first name is required")
      .trim()
      .escape(),
  check("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
  validate, 
  userController.register
);

router.post('/login', validate, userController.login);

router.get('/profile', validate, authenticateToken, userController.getProfile);

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
