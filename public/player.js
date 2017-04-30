import Game from './game.js';

export default class Player {
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
    if (x && x >= 0 && x <= 768 - 16) {
      this.x = x;
    }
    if (y && y >= 0 && y <= 768 - 24) {
      this.y = y;
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
