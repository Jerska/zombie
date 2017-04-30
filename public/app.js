import Player from './Player.js';
import Monster from './Monster.js';
import Game from './Game.js';

var state = CONSTANTS.state;

const game = new Game(state.game);
game.$init();

/* Socket.io */

var socket = io.connect('http://localhost:3100');

Player.nickname = localStorage.getItem('nickname');
if (!Player.nickname) {
  Player.nickname = prompt('What\'s your nickname?');
  localStorage.setItem('nickname', Player.nickname);
}

socket.emit('new_player', Player.nickname);

socket.on('load_player', p => {
  game.addPlayer(p);
});

window.addEventListener('keydown', update, true);

function update(e) {
  if (e.defaultPrevented) return;
  const me = Player.me;

  function _update (key, params) {
    if (e.key !== key) return;
    me.update(params);
    socket.emit('update_player', me.x, me.y);
    e.preventDefault();
  }

  _update('ArrowDown', {y: me.y - 16});
  _update('ArrowUp', {y: me.y + 16});
  _update('ArrowLeft', {x: me.x - 16});
  _update('ArrowRight', {x: me.x + 16});
}

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
  const _map = Game.map.$this.getBoundingClientRect();
  const yb = event.clientY - _map.y; // ici ça prout :'(
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
}

document.addEventListener("click", shot);
