const router = require('express').Router()
const { models: { User, Order}} = require('../db')
module.exports = router

//Logged in users get user profile
//Get/api/users/profile for logged in users
router.get('/profile', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    res.send(await User.findByToken(token));
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
    const order = await user.getOrder(user.id);
    const cart = await Order.getCart(order.id);
   res.send(cart)
  } catch (err) {
    next(err);
  }
});