const emoji = require('node-emoji').emoji;

const modeEmoji = (mode) => {
  const modes = {
    'BUS': emoji.bus,
    'WALK': emoji.walking,
    'TRAM': emoji.tram,
    'RAIL': emoji.train2,
    'SUBWAY': emoji.metro,
    'FERRY': emoji.ferry,
  };

  return (mode in modes) ? modes[mode] : 'Travel';
};

module.exports = modeEmoji;
