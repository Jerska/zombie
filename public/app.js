var state = CONSTANTS.state;

var $game = document.getElementById('game');
var $players = document.getElementById('players');
var $monsters = document.getElementById('monsters');

function updateMap(state) {
  var map = state.game.map;
  $game.style.width = map.width + 'px';
  $game.style.height = map.height + 'px'
  $game.style.marginTop = '-' + Math.round(map.width / 2) + 'px';
  $game.style.marginLeft = '-' + Math.round(map.width / 2) + 'px';
}

function updatePlayers(state) {
  var players = state.game.players;
  var html = '';
  players.forEach(function (player) {
    var selector ='[data-nickname="' + encodeURIComponent(player.nickname) + '"]';
    var $current = $players.querySelector(selector);
    if ($current) return;

    var $player = document.createElement('div');
    $player.className = 'player';
    $player.style.left = player.x + 'px'
    $player.style.bottom = player.y + 24 + 'px';
    $player.setAttribute('data-nickname', encodeURIComponent(player.nickname));

    $players.appendChild($player);
  });
}

function updateMonsters(state) {
  var monsters = state.game.monsters;
  var html = '';
  monsters.forEach(function (monster) {
    var $monster = document.createElement('div');
    $monster.className = 'monster';
    $monster.style.left = monster.x + 'px'
    $monster.style.bottom = monster.y + 24 + 'px';

    $monsters.appendChild($monster);
  });
}

updateMap(state);
updatePlayers(state);
updateMonsters(state);

/* Socket.io */

var socket = io.connect('http://localhost:3100');

if (localStorage.getItem('nickname') == undefined) {
  var nickname = prompt('What\'s your nickname?');
  localStorage.setItem('nickname', nickname);
} else {
  var nickname = localStorage.getItem('nickname');
}

socket.emit('new_player', nickname);

socket.on('load_player', function(x, y) {
  console.log('New player at position : ' + x + ' ' + y);
});

window.addEventListener('keydown', update, true);

function update(event) {
    socket.emit('info');
    socket.on('info_player', function(x, y) {
        if (event.keyCode == 38 && y > 0)
            y-= 24;
        if (event.keyCode == 40 && y < 768)
            y += 24;
        if (event.keyCode == 37 && x > 0)
            x -= 16;
        if (event.keyCode == 39 && x  < 768)
            x += 16;
        socket.emit('update_player', x, y);
/* Ici faut redraw la div du joueur qui vient de se déplacer */ 
    });
}
