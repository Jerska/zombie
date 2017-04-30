import Game from './Game.js';

export default class Player {
  static WIDTH = 16;
  static HEIGHT = 24;
  static SPEED = 128;

  static $players = document.getElementById('players');

  static find (nickname) {
    return Game.instance.players.find(player => player.nickname === nickname);
  }

  static nickname = null;
  static get me () {
    return Player.find(Player.nickname);
  }

  constructor ({nickname, x, y}) {
    this.nickname = nickname;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.angle = 0;
  }

  update ({x, y}) {
    if (x !== undefined) {
      this.x = x;
      if (x <= 0) this.x = 0;
      if (x + Player.WIDTH >= Game.instance.map.width) {
        this.x = Game.instance.map.width - Player.WIDTH;
      }
    }
    if (y !== undefined) {
      this.y = y;
      if (y <= 0) this.y = 0;
      if (y + Player.HEIGHT >= Game.instance.map.height) {
        this.y = Game.instance.map.height - Player.HEIGHT;
      }
    }
  }

  move({previous}) {
    const duration = Game.instance.now - previous;
    const amount = duration / 1000 * Player.SPEED * this.speed;
    this.update({
      x: this.x + Math.cos(this.angle) * amount,
      y: this.y + Math.sin(this.angle) * amount
    });

    if (this === Player.me) {
      Game.instance.socket.emit('update_player', this.x, this.y, Game.instance.now);
    }

    this.$draw();
  }

  setMovement ({x, y}) {
    if (x === 0 && y === 0) {
      this.speed = 0;
      this.angle = 0;
      return;
    }
    this.speed = 1;
    this.angle = Math.atan2(y, x);
  }

  get $this () {
    if (this._$this) return this._$this;
    return this._$this = this.$add();
  }

  $add () {
    let $player = document.createElement('div');
    $player.className = 'player';
    $player.setAttribute('data-nickname', encodeURIComponent(this.nickname));
    Player.$players.appendChild($player);
    return this._$this = $player;
  }

  $draw () {
    this.$this.style.left = this.x + 'px'
    this.$this.style.bottom = this.y + 'px';
  }
};
