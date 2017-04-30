const MAP_SIZE = 768;

let id_monster = 0;

let monsters = [];

function generateMonster() {
  min = Math.ceil(0);
  max = Math.floor(MAP_SIZE);
  let monster = {
    x: Math.floor(Math.random() * (max - min -16)) + min,
    y: Math.floor(Math.random() * (max - min -16)) + min,
    id: id_monster
  };
  id_monster += 1;
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
    projectiles: [],
    map: {
      width: MAP_SIZE,
      height: MAP_SIZE
    }
  }
};
