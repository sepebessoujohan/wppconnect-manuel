module.exports = {
  apps: [
    {
      name: 'wppconnect-multisession',
      script: 'dist/index.js',
      watch: false,
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
