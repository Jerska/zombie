import Player from './Player.js';
import Monster from './Monster.js';
import Game from './Game.js';

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

socket.on('draw_player', p => {
  const player = Player.find(p.nickname);
  player.update(p);
  player.$draw();
});

socket.on('draw_monster', m => {
  const monster = Monster.find(m.id);
  monster.update(m);
  monster.$draw();
});


function shot(event) {
  const me = Player.me;
  const _map = Game.instance.map.$this.getBoundingClientRect();
  const yb = 768 + _map.y - event.clientY;
  const ya = me.y + 12;
  const xb = event.clientX - _map.x;
  const xa = me.x + 8;
  const angle = Math.atan2(yb - ya, xb - xa);
  const dist = Math.sqrt((yb - ya) * (yb - ya) + (xb - xa) * (xb - xa));
  const xc = xa + Math.cos(angle) * (dist / 2);
  const yc = ya + Math.sin(angle) * (dist / 2);
  console.log(`x map : ${_map.x} et y map : ${_map.y}`);
  console.log(`Xa : ${xa}  et Ya : ${ya}`);
  console.log(`X : ${xc}  et Y : ${yc}`);
  console.log(`Xb : ${xb}  et Yb : ${yb}`);
  Game.instance.addMissile(xc, yc);
}

document.addEventListener("click", shot);
