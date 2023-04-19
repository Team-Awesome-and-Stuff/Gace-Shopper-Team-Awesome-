const router = require("express").Router();
const {
  models: { Products, User },
} = require("../db");
module.exports = router;

//user get all products logged in/not logged in
//Get/api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll({
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//user get single product logged in/not logged in
//Get/api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});






