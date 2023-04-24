const User = require('../db/models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminAuth = async (req, res, next) => {
    let token = req.cookies.auth
    if (!token) return res.sendStatus(401).send({ error: 'No token provided' })
    let decodedToken = jwt.decode(token, { complete: true })
    if (!decodedToken) return res.sendStatus(401).send({ error: 'Invalid token' })
    let validate = jwt.verify(token, process.env.JWT_SECRET)
    if (!validate) return res.sendStatus(401).send({ error: 'Invalid token.' })
    req.user = await User.findByPk(validate.id)
    const isAdmin = await req.user.isAdmin
    if (!isAdmin)return res.sendStatus(401).send({ error: 'You are not authorized to access' })
    return next()
}

const userAuth = async (req, res, next) => {
    let token = req.cookies.auth
    
    if (!token) return res.sendStatus(401).json({ error: 'No token provided' })
    let verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.sendStatus(401).json({ error: 'Invalid token.' })
    req.user = await User.findByPk(verified.id)
    if (!req.user) return res.status(401).json({ error: 'User not found' })
    return next()
}

module.exports = { userAuth, adminAuth }
