import Map from './Map.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Projectile from './Projectile.js';

export default class Game {
  static instance = null;

  static $missiles = document.getElementById('missiles');

  constructor ({map, players, projectiles, monsters}, socket) {
    Game.instance = this;
    this.map = new Map(map);
    this.players = players.map(p => new Player(p));
    this.monsters = monsters.map(m => new Monster(m));
    this.projectiles = projectiles.map(p => new Projectile(p));
    this.socket = socket;
    this.previousUpdate = new Date().getTime();
  }

  update () {
    const currentDate = new Date().getTime();
    this.players.forEach(p => {
      p.move({duration: currentDate - this.previousUpdate});
    });
    this.projectiles.forEach(p => {
      p.move({duration: currentDate - this.previousUpdate});
    });
    this.previousUpdate = currentDate;
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
