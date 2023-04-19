const router = require('express').Router()
const { models: { User,}} = require('../db')
module.exports = router

//Logged in users get user profile
//Get/api/users/profile for logged in users
router.get('/profile', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

//Logged in users get user cart
//Get/api/users/cart for logged in users
router.get('/cart', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const cart = await user.getCart();
   res.send(cart)
  } catch (err) {
    next(err);
  }
});