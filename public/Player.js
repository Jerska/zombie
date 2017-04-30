import Game from './Game.js';

export default class Player {
  static WIDTH = 16;
  static HEIGHT = 24;

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
