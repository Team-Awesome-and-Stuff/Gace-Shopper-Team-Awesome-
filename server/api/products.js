const router = require("express").Router();
const {
  models: { Products, User },
} = require("../db");
module.exports = router;


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

//Get/api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Post/api/products
router.post("/", async (req, res, next) => {
  try {
    const user = await User.adminCheck();
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const product = await Products.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Put/api/products/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.adminCheck();
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const product = await Products.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Delete/api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.adminCheck();
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const product = await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});
