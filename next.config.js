const withPWA = require('next-pwa');
const path = require('path');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});
