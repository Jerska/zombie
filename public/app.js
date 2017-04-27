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
    var selector ='[data-id="' + encodeURIComponent(monster.id) + '"]';
    var $current = $monsters.querySelector(selector);
    if ($current) return;

    var $monster = document.createElement('div');
    $monster.className = 'monster';
    $monster.style.left = monster.x + 'px'
    $monster.style.bottom = monster.y + 24 + 'px';
    $monster.setAttribute('data-id', encodeURIComponent(monster.id));

    $monsters.appendChild($monster);
  });
}

updateMap(state);
updatePlayers(state);
updateMonsters(state);

/* Socket.io */

var socket = io.connect('http://localhost:3100');

var nickname = null;
var player = null;

if (localStorage.getItem('nickname') == undefined) {
  nickname = prompt('What\'s your nickname?');
  localStorage.setItem('nickname', nickname);
} else {
  nickname = localStorage.getItem('nickname');
}

socket.emit('new_player', nickname);

socket.on('load_player', function(player2) {
  if (player2.nickname === nickname) {
    player = player2;
  }
  var exists = state.game.players.find(player3 => player2.nickname === player3.nickname);

  if (!exists) state.game.players.push(player2);

  updatePlayers(state);
  console.log('New player at position : ' + player.x + ' ' + player.y);
});

window.addEventListener('keydown', update, true);

function drawPlayer (player) {
  console.log('drawPlayer(' + player.nickname + ')');
  const player2 = state.game.players.find(player2 => player.nickname === player2.nickname);

  player2.x = player.x;
  player2.y = player.y;

  var selector ='[data-nickname="' + encodeURIComponent(player.nickname) + '"]';
  var $current = $players.querySelector(selector);

  $current.style.left = player.x + 'px'
  $current.style.bottom = player.y + 'px';
}

function drawMonster (monster) {
  const monster2 = state.game.monsters.find(monster2 => monster.id === monster2.id);

  monster2.x = monster.x;
  monster2.y = monster.y;

  var selector ='[data-id="' + encodeURIComponent(monster.id) + '"]';
  var $current = $monsters.querySelector(selector);

  $current.style.left = monster.x + 'px'
  $current.style.bottom = monster.y + 'px';
}

function update(event) {
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
}

socket.on('draw_player', function (player) {
  console.log("On redraw : " + nickname);
  drawPlayer(player);
});

socket.on('draw_monster', function (monster) {
  drawMonster(monster);
});
