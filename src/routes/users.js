/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Creation of a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com'
 *               name:
 *                 type: string
 *                 example: Joe Doe
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Endpoint for user login
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com'
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Endpoint for user login
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Endpoint for logut
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/users');
const {
  validate,
  createRegistrationUserSchema,
  createLoginUserSchema,
} = require('../../middleware/validate');
const authenticateToken = require('../../middleware/authMiddleware');

router.post('/register', createRegistrationUserSchema, validate, register);

router.post('/login', createLoginUserSchema, validate, login);

router.get('/profile', validate, authenticateToken, getProfile);
router.get('/logout', validate, authenticateToken, logout);

module.exports = router;
