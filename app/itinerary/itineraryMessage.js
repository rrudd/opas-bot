const Moment = require('moment');
const modeEmoji = require('../helpers/modeEmoji')

const duration = (seconds) => Moment.duration(seconds, 'seconds').humanize();

const itineraryMessage = (itinerary, places) => {
  let message = `*${places.from.name} - ${places.to.name} (${duration(itinerary.duration)})*\n`;
  itinerary.legs.forEach((leg, index) => {
    const startTime = Moment(leg.startTime).format("HH:mm");
    const endTime = Moment(leg.endTime).format("HH:mm");
    const isFirstLeg = (index === 0);
    const isLastLeg = (index === itinerary.legs.length - 1);
    const legDuration = `(${duration(leg.duration)})`;
    const mode = `${modeEmoji(leg.mode)}`;

    // First leg
    if (isFirstLeg) {
      if (leg.transitLeg) {
        message += `\`${startTime}\` ${mode} *${leg.route.shortName}* to ${leg.to.name} ${legDuration}\n`
      }
      else {
        message += `\`${startTime}\` ${mode} to ${leg.to.name} ${legDuration}\n`
      }
    }

    // Last leg
    if (isLastLeg && !isFirstLeg) {
      if (leg.transitLeg) {
        message += `\`${startTime}\` ${mode} *${leg.route.shortName}* from ${leg.from.stop.name} ${legDuration}\n`
      }
      else {
        message += `\`${startTime}\` ${mode} from ${leg.from.name} ${legDuration}\n`
      }
    }

    // Intermediate legs
    if (!isFirstLeg && !isLastLeg) {
      if (leg.transitLeg) {
        message += `\`${startTime}\` ${mode} *${leg.route.shortName}* ${leg.from.stop.name} - ${leg.to.name} ${legDuration}\n`
      }
      else {
        message += `\`${startTime}\` ${mode} from ${leg.from.name} to ${leg.to.name} ${legDuration}\n`
      }
    }

  });
  return message;
}

module.exports = itineraryMessage;
