const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  store: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      //check if email is already registeret
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user o bject and save it in Mongo (via try-catch)
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await user.save(); //save user
      res.status(201).json({ error: null, data: savedUser._id });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      //if login info is valid find the user
      const user = await User.findOne({ email: email });

      //throw error if email is wrong - user does not exist in DB
      if (!user) {
        return res.status(400).json({ error: 'Email or Password is wrong' });
      }

      //check for password correctness
      const validPassword = await bcrypt.compare(password, user.password);

      //throw error if password is wrong
      if (!validPassword) {
        return res.status(400).json({ error: 'Email or Password is wrong' });
      }

      //create authentication token with username and id
      const token = jwt.sign(
        //payload data
        {
          name: user.name,
          id: user._id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.header('auth-token', token).json({
        error: null,
        data: { token },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
