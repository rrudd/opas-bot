const TelegramBot = require('node-telegram-bot-api');
const GraphQLRequest = require('graphql-request').request;

const config = require('./config');
const parseRouteSearch = require('./app/itinerary/parseRouteSearch');
const itineraryQuery = require('./app/itinerary/itineraryQuery');
const itineraryMessage = require('./app/itinerary/itineraryMessage');
const geocode = require('./app/geocode/geocode');


const cmds = {
  route: '/route'
}

const bot = new TelegramBot(config.token, {polling: true});

bot.onText(new RegExp(cmds.route), function (msg, match) {
  let outMessage = '';
  const routeParams = parseRouteSearch(msg.text.replace(cmds.route, ''));

  if (routeParams.from != '' && routeParams.to != '') {
    Promise.all([geocode(routeParams.from, 'from'), geocode(routeParams.to, 'to')])
      .then(results => {
        const places = {
          from: results.find(x => x.type === 'from'),
          to: results.find(x => x.type === 'to'),
        };
        GraphQLRequest(config.routingEndpoint, itineraryQuery(places)).then(data => {
          outMessage = itineraryMessage(data.plan.itineraries[0], places);
          bot.sendMessage(msg.from.id, outMessage, {parse_mode: 'Markdown'});
        });
      });
  }
  else {
    bot.sendMessage(msg.from.id, 'Your message should be in the format "/route origin - destination".');
  }


});
