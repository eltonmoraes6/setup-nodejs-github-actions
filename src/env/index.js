//NODE Environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
    silent: false,
  });
} else {
  require('dotenv').config({
    path: '.env.production',
    silent: false,
  });
}
