const router = require("express").Router();
const {
  models: { Products, User },
} = require("../db");
module.exports = router;

//admin retrieves all products
//Get/api/admin/products
// router.get("/products", async (req, res, next) => {
//   try {
//     const products = await Products.findAll({
//     });
//     res.json(products);
//   } catch (err) {
//     next(err);
//   }
// });

//admin creates a single product
//Post/api/admin/products 
router.post("/products", async (req, res, next) => {
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

//admin updates a single product
//Put/api/admin/products/:id 
router.put("/products/:id", async (req, res, next) => {
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

//admin deletes a single product
//Delete/api/admin/products/:id 
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

//admin retrieve all users
//Get/api/admin/users 
router.get('/users', async (req, res, next) => {
  try {
    const user = await User.adminCheck();
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//admin retrieve user by id
//get/api/admin/users/:id 
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.adminCheck();
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    res.send(await User.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});