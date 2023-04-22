const router = require('express').Router();
const User = require('../db/models/User');


//Post/auth/login
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//Post/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password} = req.body;
    const user = await User.create({ 
      email: email, 
      password: password
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});


module.exports = router