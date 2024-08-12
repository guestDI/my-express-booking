const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const validate = require('../middleware/validate')
const { check } = require('express-validator')
const authenticateToken = require('../middleware/authMiddleware')

router.post(
  '/register',
  check('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),
  check('name').not().isEmpty().withMessage('Name is required').trim().escape(),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 chars long'),
  validate,
  userController.register
)

router.post('/login', 
  check('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 chars long'),
  validate, 
  userController.login)

router.get('/profile', validate, authenticateToken, userController.getProfile)
router.get('/logout', validate, authenticateToken, userController.logout)

module.exports = router
