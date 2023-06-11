const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');
const app = express();

//setup Swagger
const swaggerDocument = YAML.load('swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware defitions
app.use(morgan('dev'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Handle CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'auth-token, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//Routes
app.use(require('./routes'));

module.exports = {
  app,
};
