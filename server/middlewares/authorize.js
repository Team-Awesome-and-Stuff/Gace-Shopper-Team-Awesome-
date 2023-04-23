const { User } = require('../db/models/User')
const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    let token = req.cookies.admin
    if (!token) return res.sendStatus(401).json({ error: 'No token provided' })
    let verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.sendStatus(401).json({ error: 'Invalid token.' })
    req.user = await User.findByPk(verified.id)
    const isAdmin = await req.user.isAdmin
    if (!isAdmin) return res.sendStatus(401).json({ error: 'You are not authorized to access'})
    return next()
}

const userAuth = async (req, res, next) => {
    let token = req.cookies.auth
    if (!token) return res.sendStatus(401).json({ error: 'No token provided' })
    let verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.sendStatus(401).json({ error: 'Invalid token.' })
    req.user = await User.findByPk(verified.id)
    return next()
}

module.exports = { userAuth, adminAuth }
