var map = CONSTANTS.state.game.map;
var $game = document.getElementById('game');

var player = CONSTANTS.state.game.player;

console.log(map);

$game.style.width = map.width + 'px';
$game.style.height = map.height + 'px'
$game.style.marginTop = '-' + Math.round(map.width / 2) + 'px';
$game.style.marginLeft = '-' + Math.round(map.width / 2) + 'px';

console.log(map);
