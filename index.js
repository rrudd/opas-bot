const telegramBot = require('node-telegram-bot-api');
const config = require('./config');
const itinerary = require('./app/itinerary/itinerary')

const bot = new telegramBot(config.token, {polling: true});

bot.onText(new RegExp(config.cmds.route), async function(msg, match) {
  bot.sendMessage(msg.from.id, await itinerary(msg), {parse_mode: 'Markdown'});
});
