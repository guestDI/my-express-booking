const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/verify-email', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).send('Invalid token');
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.isVerified) {
      return res.status(400).send('Email is already verified');
    }

    user.isVerified = true;
    await user.save();

    res.send('Your email has been verified successfully!');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
