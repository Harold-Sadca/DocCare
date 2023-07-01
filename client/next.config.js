/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: '**',
        // hostname: 'images.pexels.com'
        hostname: 'res.cloudinary.com'
      },
    ],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },

  // Specify the custom server file
  server: {
    // Custom server file path
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
    // Custom server file path
    webpackHotMiddleware: (config) => {
      return config;
    },
  },
}

module.exports = nextConfig

