const router = require("express").Router();
const Product = require("../../db/models/Product");
const Order = require("../../db/models/Order");
module.exports = router;


//Get/api/users/cart for logged out users
//cart info will need to be stored in cookies or local storage under key "cart"
router.get("/cart", async (req, res, next) => {
  try {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      return res.status(404).json("Cart not found");
    }
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//Logged in users create new order
//Post/api/users/cart for logged out users
router.post("/cart", async (req, res, next) => {
  try {
    const userId = localStorage.getItem("userId");
    const products = req.body.products; // array of product IDs and quantities
    console.log("Products>>>>>>", products);
    const order = await Order.createOrder(user.id, products);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//Change quantity of a product in cart
//Put/api/users/cart/:id/products/:productId for logged out users
router.put("/cart/:id/products/:productId", async (req, res, next) => {
  try {
    const { id: orderId, productId } = req.params;
    const { quantity } = req.body;
    const userId = localStorage.getItem("userId");
    let cart = await OrderProduct.getCart(orderId);
    if (!cart) {
      return res.status(404).json("Cart not found");
    }
    const updateProductQantity = Order.updateProductQuantity.bind(Order);
    await updateProductQantity(productId, quantity);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});