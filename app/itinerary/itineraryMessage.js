const moment = require('moment');
const modeEmoji = require('../helpers/modeEmoji')

const durationText = (seconds) => moment.duration(seconds, 'seconds').humanize();

const itineraryMessage = (itinerary, places) => {
  let message = `*${places.from.name} - ${places.to.name} (${durationText(itinerary.duration)})*\n`;
  
  itinerary.legs.forEach((leg, index) => {
    const isFirstLeg = (index === 0);
    const isLastLeg = (index === itinerary.legs.length - 1);
    const startTime = moment(leg.startTime).format("HH:mm");
    const endTime = moment(leg.endTime).format("HH:mm");
    const legDuration = `(${durationText(leg.duration)})`;
    const legMode = leg.transitLeg ? `${modeEmoji(leg.mode)} *${leg.route.shortName}*` : `${modeEmoji(leg.mode)}`;
    let legDescription = '';

    // First leg
    if (isFirstLeg) {
      legDescription = `to ${leg.to.name}`;
    }

    // Last leg
    if (isLastLeg && !isFirstLeg) {
      legDescription = `from ${leg.from.name}`;
    }

    // Intermediate legs
    if (!isFirstLeg && !isLastLeg) {
      legDescription = `${leg.from.name} - ${leg.to.name}`;
    }

    message += `\`${startTime}\` ${legMode} ${legDescription} ${legDuration}\n`;

  });
  return message;
}

module.exports = itineraryMessage;
