const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')
const Blacklist = require('../models/blacklist')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    const blacklistedToken = await Blacklist.findOne({ where: { token } })

    if (blacklistedToken) {
      return res.sendStatus(403)
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findByPk(decoded.id, {
      include: [Role],
    })

    if (!user) {
      return res.sendStatus(403)
    }

    req.user = {
      id: user.id,
      username: user.username,
      role: user.Role.name,
    }
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

module.exports = authenticateToken
