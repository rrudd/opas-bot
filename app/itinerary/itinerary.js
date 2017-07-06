const graphQLRequest = require('graphql-request').request;
const itineraryQuery = require('./itineraryQuery');
const itineraryMessage = require('./itineraryMessage');
const parseRouteSearch = require('../helpers/parseRouteSearch');
const geocode = require('../geocode/geocode');
const config = require('../../config');

async function itinerary(msg) {
  const routeParams = parseRouteSearch(msg.text.replace(config.cmds.route, ''));

  if(!routeParams.from || !routeParams.to) {
    return `Your message should be in the format "${config.cmds.route} origin - destination".`;
  }

  if (!routeParams.time) {
    return `Time input should be in the format HH:mm`;
  }

  const places = {
    from: await geocode(routeParams.from),
    to: await geocode(routeParams.to),
  }

  if (!places.from || !places.to) {
    return `Geocoding failed. Please try again with a different origin or destination.`;
  }

  const routingResponse = await graphQLRequest(config.routingEndpoint, itineraryQuery(places, routeParams.time));
  return itineraryMessage(routingResponse.plan.itineraries[0], places);
}


module.exports = itinerary;
