import Game from './Game.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Projectile from './Projectile.js';

var state = CONSTANTS.state;

var socket = io.connect('http://localhost:3100');

const game = new Game(state.game, socket);
game.$init();
setInterval(() => {
  game.update();
}, 16);

/* Socket.io */

Player.nickname = localStorage.getItem('nickname');
if (!Player.nickname) {
  Player.nickname = prompt('What\'s your nickname?');
  localStorage.setItem('nickname', Player.nickname);
}

socket.on('timestamp', timestamp => {
  game.timestamp = new Date().getTime() - timestamp;
});


socket.emit('new_player', Player.nickname);

socket.on('load_player', p => {
  game.addPlayer(p);
});

let keyStatuses = {};
const keyMoves = {
  ArrowUp: ['y', 1],
  ArrowRight: ['x', 1],
  ArrowDown: ['y', -1],
  ArrowLeft: ['x', -1]
};
function handleKeys (e) {
  if (Object.keys(keyMoves).indexOf(e.key) === -1) return;
  keyStatuses[e.key] = e.type === 'keydown';
  var move = {
    x: 0,
    y: 0
  };
  for (var key in keyMoves) {
    if (!keyMoves.hasOwnProperty(key)) continue;
    if (!keyStatuses[key]) continue;
    const [dir, val] = keyMoves[key];
    move[dir] += val;
  }
  Player.me.setMovement(move);
}

window.addEventListener('keydown', handleKeys, true);
window.addEventListener('keyup', handleKeys, true);

socket.on('draw_player', (p, timestamp) => {
  const player = Player.find(p.nickname);
  player.update(p);
  player.move({previous: timestamp});
  player.$draw();
});

socket.on('draw_monster', m => {
  const monster = Monster.find(m.id);
  monster.update(m);
  monster.$draw();
});

socket.on('new_projectile', p => {
  Game.instance.projectiles.push(new Projectile(p));
});

function shot(event) {
  const me = Player.me;
  const _map = Game.instance.map.$this.getBoundingClientRect();
  const yb = _map.bottom - event.clientY;
  const ya = me.y + 12;
  const xb = event.clientX - _map.left;
  const xa = me.x + 8;
  const angle = Math.atan2(yb - ya, xb - xa);
  const projectile = new Projectile({
    x: me.x + Player.WIDTH / 2,
    y: me.y + Player.HEIGHT / 2,
    width: 2,
    height: 2,
    speed: 1,
    angle: angle,
    damage: 5,
    startTime: game.now
  });
  Game.instance.projectiles.push(projectile);
  Game.instance.socket.emit('new_projectile', projectile);
}

document.addEventListener("click", shot);
