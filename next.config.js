const withPWA = require('next-pwa');
const path = require('path');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  future: { webpack5: true },
  pwa: {
    dest: 'public',
    runtimeCaching,
    swSrc: 'service-worker.js'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});
