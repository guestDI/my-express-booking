const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    // generate properly secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findByPk(decoded.id)

    if (!user) {
      return res.sendStatus(403)
    }

    req.user = user
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

module.exports = authenticateToken
