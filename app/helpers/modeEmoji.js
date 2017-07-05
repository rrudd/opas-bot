const Emoji = require('node-emoji').emoji;

const modeEmoji = (mode) => {
  const modes = {
    'BUS': Emoji.bus,
    'WALK': Emoji.walking,
    'TRAM': Emoji.tram,
    'RAIL': Emoji.train2,
    'SUBWAY': Emoji.metro,
    'FERRY': Emoji.ferry,
  };

  return (mode in modes) ? modes[mode] : 'Travel';
};

module.exports = modeEmoji;
