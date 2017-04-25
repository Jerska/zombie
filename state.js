const MAP_SIZE = 768;

let monsters = [];
function generateMonster() {
    min = Math.ceil(0);
    max = Math.floor(MAP_SIZE);
    let monster = {
        x: Math.floor(Math.random() * (max - min -16 +1)) + min,
        y: Math.floor(Math.random() * (max - min -24 +1)) + min
    };
    console.log(`Monster position ${monster.x} and ${monster.y}`);
    monsters.push(monster);
}

generateMonster();
generateMonster();
generateMonster();

module.exports = {
  game: {
    players: [],
    monsters: monsters,
    map: {
      width: MAP_SIZE,
      height: MAP_SIZE
    }
  }
};
