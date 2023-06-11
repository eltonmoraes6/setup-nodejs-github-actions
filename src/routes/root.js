const { Router } = require('express');
const router = Router();
const { sayHello } = require('../services/sayHelloWorld');
const { sayWelcome } = require('../services/sayWelcomeAPI');

router.get('/', (req, res) => {
  res.send(sayHello());
});

router.get('/welcome', (req, res) => {
  res.status(200).send(sayWelcome());
});

module.exports = router;
