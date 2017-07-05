const graphQLRequest = require('graphql-request').request;
const itineraryQuery = require('./itineraryQuery');
const itineraryMessage = require('./itineraryMessage');
const parseRouteSearch = require('../helpers/parseRouteSearch');
const geocode = require('../geocode/geocode');
const config = require('../../config');

async function itinerary(msg) {
  const routeParams = parseRouteSearch(msg.text.replace(config.cmds.route, ''));

  if (routeParams.from != '' && routeParams.to != '') {
    const places = {
      from: await geocode(routeParams.from),
      to: await geocode(routeParams.to),
    }
    const routingResponse = await graphQLRequest(config.routingEndpoint, itineraryQuery(places));
    return await itineraryMessage(routingResponse.plan.itineraries[0], places);
  } else {
    return `Your message should be in the format "${config.cmds.route} origin - destination".`;
  }
}


module.exports = itinerary;
