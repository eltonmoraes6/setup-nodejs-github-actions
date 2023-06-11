require('dotenv').config({
  path: '.env.development',
  silent: false,
});
const http = require('http');
const mongoose = require('mongoose');

require('../src/env');
const { app } = require('../src/app');

const server = http.createServer(app);
let appServer;
let databaseInfo;

//connect to the MongoDB using Mongoose ODM
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    const db = mongoose.connection;
    databaseInfo = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
      console.log('Connected successfully');
    });

    appServer = server.listen(process.env.PORT, '0.0.0.0', () => {
      console.log('HTTP Server Running!');
      console.log(new Date().toUTCString());
      console.log('Port: ', process.env.PORT);
      console.log('Environment: ', process.env.NODE_ENV);
      console.log(
        `\nDatabase Name: ${databaseInfo.name} \nDataBAse Host: ${databaseInfo.host} \nDatabase Port: ${databaseInfo.port}`
      );

      let FuncPort = server.address().port;
      let host = server.address().address;
      console.log('Server is running http://%s:%s', host, FuncPort);
    });
  })
  .catch((err) => {
    console.log('Something went wrong with the database connection', err);
  });

console.log('appServer: ', appServer);

module.exports = appServer;
