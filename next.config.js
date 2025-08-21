/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/episodes/:number',
        destination: '/:number',
        permanent: true,
      },
      {
        source: '/episodes',
        destination: '/all',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig