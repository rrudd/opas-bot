const itineraryQuery = (places, time) => {

  return `{
    plan(
      fromPlace: "${places.from.name}"
      from: {lat: ${places.from.coordinates.lat}, lon: ${places.from.coordinates.lon}}
      toPlace: "${places.to.name}"
      to: {lat: ${places.to.coordinates.lat}, lon: ${places.to.coordinates.lon}}
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
