const config = {
  routingEndpoint: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  geocodingEndpoint: 'http://api.digitransit.fi/geocoding/v1/search',
  cmds: {
    route: '/route'
  },
}

module.exports = config;
