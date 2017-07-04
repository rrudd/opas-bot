const parseRouteSearch = (msg) => {
  let message = msg.trim();
  let time = '';
  let from = '';
  let to = ''

  if (message.includes(':')) {
    time = message.split(' ')[0];
    message = message.replace(time, '');
  }
  if (message.includes('-')) {
    from = message.split('-')[0].trim(),
    to = message.split('-')[1].trim()
  }
  return {from, to, time}
}

module.exports = parseRouteSearch;
