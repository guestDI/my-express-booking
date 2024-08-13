const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/users');
const {
  validate,
  createRegistrationUserSchema,
  createLoginUserSchema,
} = require('../middleware/validate');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', createRegistrationUserSchema, validate, register);

router.post('/login', createLoginUserSchema, validate, login);

router.get('/profile', validate, authenticateToken, getProfile);
router.get('/logout', validate, authenticateToken, logout);

module.exports = router;
