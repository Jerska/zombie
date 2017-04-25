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