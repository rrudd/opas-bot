const itineraryQuery = (places, time) => {
  const fromPlace = places.find(x => x.type === 'from');
  const toPlace = places.find(x => x.type === 'to');

  return `{
    plan(
      fromPlace: "${fromPlace.name}"
      from: {lat: ${fromPlace.coordinates.lat}, lon: ${fromPlace.coordinates.lon}}
      toPlace: "${toPlace.name}"
      to: {lat: ${toPlace.coordinates.lat}, lon: ${toPlace.coordinates.lon}}
      modes: "BUS,TRAM,RAIL,SUBWAY,FERRY,WALK"
      walkReluctance: 2.1
      walkBoardCost: 600
      minTransferTime: 180
      walkSpeed: 1.2
    ) {
      itineraries{
        walkDistance
        duration
        legs {
          mode
          startTime
          endTime
          from {
            name
            stop {
              name
            }
          }
          to {
            name
          }
          route {
            shortName
          }
          transitLeg
        }
      }
    }
  }`
}


module.exports = itineraryQuery;
