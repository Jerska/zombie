const MAP_SIZE = 48;

function createMap () {
  return new Array(MAP_SIZE).fill(null).map(() => (
    new Array(MAP_SIZE).fill(null).map(() => ({ color: '#555' }))
  ));
}

console.log(createMap());

module.exports = {
  game: {
      map: createMap(),
      player: {
	  x : 10,
	  y : 10
      }
  }
};
