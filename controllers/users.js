const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')

const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userRole = await Role.findOne({ where: { name: 'user' } })

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role_id: userRole.id,
    })

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    })

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, 'your_secret_key', {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Role,
      attributes: { exclude: ['password_hash'] },
    })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getProfile,
  login,
  register,
}
