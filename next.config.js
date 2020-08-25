module.exports = {
  async redirects() {
    return [
      {
        source: '/episodes/:number',
        destination: '/:number',
        permanent: true,
      },
    ]
  },
}
