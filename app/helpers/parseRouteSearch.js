const moment = require('moment');

const parseTime = (str) => {
  if (str) {
    if (moment(str, "HH:mm", true).isValid()) {
      return moment(str, "HH:mm").format("HH:mm:ss");
    }
    return;
  }
  return moment().format("HH:mm:ss");
}

const parseRouteSearch = (msg) => {
  let message = msg.trim();
  let time;
  let from;
  let to;

  if (message.includes(':')) {
    time = message.split(' ')[0];
    message = message.replace(time, '');
    time = parseTime(time);
  }

  if (message.includes('-')) {
    from = message.split('-')[0].trim(),
    to = message.split('-')[1].trim()
  }
  
  return {from, to, time}
}

module.exports = parseRouteSearch;
