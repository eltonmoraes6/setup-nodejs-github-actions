const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { store, login } = require('../controllers/auth');
const { validate } = require('../utils/validate');

router.post(
  '/register',
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters')
    .isLength({
      min: 6,
      max: 30,
    })
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match", loc, path);
      } else {
        return value;
      }
    }),
  validate,
  store
);

router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validate,
  login
);

module.exports = router;
