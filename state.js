const MAP_SIZE = 768;

let queue_monster = [];

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

generateMonster();
generateMonster();
generateMonster();

module.exports = {
  game: {
    player: {
      x : 10,
      y : 10
    },
    map: {
      width: MAP_SIZE,
      height: MAP_SIZE
    }
  }
};
