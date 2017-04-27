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
    $player.style.bottom = player.y + 'px';
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

var nickname = null;
if (localStorage.getItem('nickname') == undefined) {
  nickname = prompt('What\'s your nickname?');
  localStorage.setItem('nickname', nickname);
} else {
  nickname = localStorage.getItem('nickname');
}

socket.emit('new_player', nickname);

socket.on('load_player', function(player) {
  console.log('New player at position : ' + player.x + ' ' + player.y);
});

window.addEventListener('keydown', update, true);

function update(event) {
  socket.emit('info');
  socket.on('info_player', function(player) {
    if (event.defaultPrevented) {
      return; // Should do nothing if the key event was already consumed.
    }
    switch (event.key) {
      case "ArrowDown":
        if (player.y > 0) {
          player.y -= 16;
        }
        break;
      case "ArrowUp":
        if (player.y < 768 - 16) {
          player.y += 16;
        }
        break;
      case "ArrowLeft":
        if (player.x > 0) {
          player.x -= 16;
        }
        break;
      case "ArrowRight":
        if (player.x < 768 - 16) {
          player.x += 16;
        }
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    socket.emit('update_player', player.x, player.y);
    event.preventDefault();
  });
}

socket.on('draw_player', function (player) {
  var players = state.game.players;
  console.log("On redraw : " + nickname);
  players.forEach(function (player2) {
    if (player2.nickname !== player.nickname) return;
    player2.x = player.x;
    player2.y = player.y;

    var selector ='[data-nickname="' + encodeURIComponent(nickname) + '"]';
    var $current = $players.querySelector(selector);

    if (player.nickname == nickname) {
      $current.style.left = player.x + 'px'
      $current.style.bottom = player.y + 'px';
    }
  });
});
