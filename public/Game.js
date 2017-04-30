import Map from './Map.js';
import Player from './Player.js';
import Monster from './Monster.js';

export default class Game {
  static instance = null;

  constructor ({map, players, monsters}) {
    Game.instance = this;
    this.map = new Map(map);
    this.players = players.map(p => new Player(p));
    this.monsters = monsters.map(m => new Monster(m));
    this.missiles = [];
  }

  addMissile(x, y) {
    let $missile = document.createElement('div');
    $missile.className = 'missile';
    this.missiles.push({"missile" : $missile, "x" : x, "y" : y});
   this.$drawMissile();
  }

  $drawMissile() {
    this.missiles[0].missile.style.left = this.missiles[0].x + 'px';
    this.missiles[0].missile.style.bottom = this.missiles[0].y + 'px';
  }

  addPlayer (p) {
    let player = Player.find(p.nickname);

    if (!player) {
      this.players.push(player = new Player(p));
      player.$add();
    }

    player.$draw();
  }

  $init () {
    this.map.$draw();
    this.players.forEach(p => {
      p.$add();
      p.$draw();
    });
    this.monsters.forEach(m => {
      m.$add();
      m.$draw();
    });
  }
}
