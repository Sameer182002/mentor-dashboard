/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ 
      process.env.S3_DOMAIN
    ],
},

}

module.exports = nextConfig
