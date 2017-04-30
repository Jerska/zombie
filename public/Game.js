import Map from './Map.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Projectile from './Projectile.js';

export default class Game {
  static instance = null;

  static $missiles = document.getElementById('missiles');

  constructor ({timestamp, map, players, projectiles, monsters}, socket) {
    Game.instance = this;
    this.timestamp = new Date().getTime() - timestamp;
    this.now = new Date().getTime() - this.timestamp;
    this.previous = this.now;

    this.map = new Map(map);
    this.players = players.map(p => new Player(p));
    this.monsters = monsters.map(m => new Monster(m));
    this.projectiles = projectiles.map(p => new Projectile(p));
    this.projectiles.forEach(p => p.move({previous: p.startTime}));
    this.socket = socket;
  }

  update () {
    this.now = new Date().getTime() - this.timestamp;
    this.players.forEach(p => {
      p.move({previous: this.previous});
    });
    this.projectiles.forEach(p => {
      this.monsters.forEach(m => {
        if (p.x >= m.x && p.x <= m.x + 16 && p.y >= m.y && p.y <= m.y + 16)
          m.$destroy();
      });
      p.move({previous: this.previous});
    });
    this.previous = this.now;
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
