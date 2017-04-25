const MAP_SIZE = 48;

let queue_monster = [];

function createMap () {
  return new Array(MAP_SIZE).fill(null).map(() => (
    new Array(MAP_SIZE).fill(null).map(() => ({ color: '#555' }))
  ));
}

function generateMonster() {
    min = Math.ceil(0);
    max = Math.floor(MAP_SIZE);
    let monster = {
        x: Math.floor(Math.random() * (max - min -16 +1)) + min,
        y: Math.floor(Math.random() * (max - min -24 +1)) + min
    };
    console.log(`Monster position ${monster.x} and ${monster.y}`);
    queue_monster.push(monster);
}

console.log(createMap());
generateMonster();
generateMonster();
generateMonster();

module.exports = {
  game: {
      map: createMap(),
      player: {
	  x : 10,
	  y : 10
      }
  }
};
