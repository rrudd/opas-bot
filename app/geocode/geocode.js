const rp = require('request-promise');
const config = require('../../config');

const geocode = (searchString) => {

  const options = {
    uri: config.geocodingEndpoint,
    qs: {
      'boundary.rect.min_lat': 59.9,
      'boundary.rect.max_lat': 60.45,
      'boundary.rect.min_lon': 24.3,
      'boundary.rect.max_lon': 25.5,
      size: 1,
      text: searchString,
    },
    json: true,
  }

  return rp(options)
    .then(results => {
      try{
        const feature = results.features[0]
        return {
          name: feature.properties.name,
          coordinates: {
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
          }
        }
      } catch(e) {
        return;
      }
    }).catch(err => {
      console.log(err);
    });
}

module.exports = geocode;
