const Moment = require('moment');
const modeEmoji = require('../helpers/modeEmoji')

const itineraryMessage = (itinerary) => {
  let message = '';
  itinerary.legs.forEach((leg, index) => {
    const startTime = Moment(leg.startTime).format("HH:mm");
    const endTime = Moment(leg.endTime).format("HH:mm");
    const isFirstLeg = (index === 0);
    const isLastLeg = (index === itinerary.legs.length - 1);

    // First leg
    if (isFirstLeg) {
      if (leg.transitLeg) {
        message += `${modeEmoji(leg.mode)} ${leg.route.shortName} to ${leg.to.name} ${startTime} - ${endTime}\n`
      }
      else {
        message += `${modeEmoji(leg.mode)} to ${leg.to.name} ${startTime} - ${endTime}\n`
      }
    }

    // Last leg
    if (isLastLeg && !isFirstLeg) {
      if (leg.transitLeg) {
        message += `${modeEmoji(leg.mode)} ${leg.route.shortName} from ${leg.from.stop.name} ${startTime} - ${endTime}\n`
      }
      else {
        message += `${modeEmoji(leg.mode)} from ${leg.from.name} ${startTime} - ${endTime}\n`
      }
    }

    // Intermediate legs
    if (!isFirstLeg && !isLastLeg) {
      if (leg.transitLeg) {
        message += `${modeEmoji(leg.mode)} ${leg.route.shortName} from ${leg.from.stop.name} to ${leg.to.name} ${startTime} - ${endTime}\n`
      }
      else {
        message += `${modeEmoji(leg.mode)} from ${leg.from.name} to ${leg.to.name} ${startTime} - ${endTime}\n`
      }
    }

  });
  return message;
}

module.exports = itineraryMessage;
