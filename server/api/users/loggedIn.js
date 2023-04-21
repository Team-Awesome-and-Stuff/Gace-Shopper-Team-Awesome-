const router = require("express").Router();
const {
  models: { User, Order, OrderProduct, Product },
} = require("../../db");
module.exports = router;

//Logged in users get user profile
//Get/api/users/profile for logged in users
router.get("/profile", User.authenticateUserToken, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

//Logged in users get user cart
//Get/api/users/cart for logged in users
router.get("/cart", User.authenticateUserToken, async (req, res, next) => {
  try {
    const user = req.user;
    const order = await user.getOrder(user.id);
    console.log("ORDER>>>>> ", order);
    if (order) {
      const cart = await OrderProduct.getCart(order.id);
      console.log("CART>>>>>> ", cart);
      res.send(cart);
    } else {
      res.status(404).json("Cart not Found");
    }
  } catch (err) {
    next(err);
  }
});

//Logged in users create new order
//Post/api/users/cart for logged in users
router.post("/cart", User.authenticateUserToken, async (req, res, next) => {
  try {
    const user = req.user;
    const products = req.body.products; // array of product IDs and quantities
    console.log("Products>>>>>>", products);
    const order = await Order.createOrder(user.id, products);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//Change quantity of a product in cart
//Put/api/users/cart/:id/products/:productId for logged in users
router.put(
  "/cart/:id/products/:productId",
  User.authenticateUserToken,
  async (req, res, next) => {
    try {
      const { id: orderId, productId } = req.params;
      const { quantity } = req.body;
      const order = await Order.findByPk(orderId);
      const updateProductQantity = order.updateProductQuantity.bind(order);
      await updateProductQantity(productId, quantity);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);


