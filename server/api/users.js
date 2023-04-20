const router = require('express').Router()
const { models: { User, Order, OrderProduct, Product}} = require('../db')
module.exports = router

//Logged in users get user profile
//Get/api/users/profile for logged in users
router.get('/profile', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('AUTH HEADER>>>>>>> ', authHeader);
    const token = authHeader.split(' ')[1];
    console.log('TOKEN>>>>> ', token);
    const user = await User.findByToken(token);
    console.log('USER: ', user);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//Logged in users get user cart
//Get/api/users/cart for logged in users
router.get('/cart', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('AUTH HEADER>>>>>>> ', authHeader);
    const token = authHeader.split(' ')[1];
    console.log('TOKEN>>>>> ', token);
    const user = await User.findByToken(token);
    console.log('USER>>>>>> ', user);
    const order = await user.getOrder(user.id);
    console.log('ORDER>>>>> ', order);
    if(order){
    const cart = await Order.getCart(order.id);
    console.log('CART>>>>>> ', cart);
   res.send(cart)
    }else{
      res.status(404).json('Cart not Found')
    }
  } catch (err) {
    next(err);
  }
});


//Logged in users create new order
router.post("/order", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const user = await User.findByToken(token);
    const products = req.body.products; // array of product IDs and quantities
    console.log('Products>>>>>>', products);
    const order = await Order.createOrder(user.id, products);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.put("/orders/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
    } else {
      // Update order properties
      await order.update(req.body);

      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});



