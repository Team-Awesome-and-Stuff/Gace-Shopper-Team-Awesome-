const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Order = require('./Order');
require("dotenv").config();


const SALT_ROUNDS = 5;

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

// User.prototype.isAdmin = function() {
//   return this.isAdmin;
// }

//this is probably wrong
User.prototype.getOrder = async function(id) {
  const order = await Order.findOne({where: {userId: id}});
  return order
}

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found')
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

User.adminCheck = async function (token) {
  const user = await User.findByToken(token);
  if (!user.isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return user
};



/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = User;
