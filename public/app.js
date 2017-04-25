var state = CONSTANTS.state;

var $game = document.getElementById('game');
var $players = document.getElementById('players');

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

updateMap(state);
updatePlayers(state);
