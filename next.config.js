module.exports = {
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
