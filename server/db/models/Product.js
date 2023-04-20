const Sequelize = require("sequelize");
const db = require("../db");


const Product = db.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7",
  },
});

//instance methods

//example of how to update product in route
//const product = await Product.findByPk(1);
//await product.updateProduct({ price: 9.99, quantity: 10 });

Product.prototype.updateProduct = async function (updates) {
  Object.keys(updates).forEach((prop) => {
    this[prop] = updates[prop];
  });
  await this.save();
  return this;
};


module.exports = Product;
