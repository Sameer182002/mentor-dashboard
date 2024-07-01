/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ 
      process.env.S3_DOMAIN,
     "storage.googleapis.com"
    ],
},

}

module.exports = nextConfig
