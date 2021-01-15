module.exports = {
  basePath: '/exhibition',
  async redirects() {
    return [
      {
        source: '/exhibition',
        destination: '/exhibition/chk',
        permanent: true,
      },
    ]
  },
}