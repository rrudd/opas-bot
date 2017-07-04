const Emoji = require('node-emoji').emoji;

const modeEmoji = (mode) => {
  switch(mode) {
    case "BUS":
      return Emoji.bus;
    case "WALK":
      return Emoji.walking;
    case "TRAM":
      return Emoji.tram;
    case "RAIL":
      return Emoji.train2;
    case "SUBWAY":
      return Emoji.metro;
    case "FERRY":
      return Emoji.ferry;
    default:
      return "";
  }
}

module.exports = modeEmoji;
