import Game from './Game.js';

export default class Monster {
  static $monsters = document.getElementById('monsters');
  static WIDTH = 16;
  static HEIGHT = 16;
  static SPEED = 128;

  static find (id) {
    return Game.instance.monsters.find(monster => monster.id === id);
  }

  constructor ({id, x, y}) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  update ({x, y}) {
    if (x) {
      this.x = x;
      if (x <= 0) this.x = 0;
      if (x + Monster.WIDTH >= Game.instance.map.width) {
        this.x = Game.instance.map.width - Monster.WIDTH;
      }
    }

    if (y) {
      this.y = y;
      if (y <= 0) this.y = 0;
      if (y + Monster.HEIGHT >= Game.instance.map.height) {
        this.y = Game.instance.map.height - Monster.HEIGHT;
      }

    }
  }

  get $this () {
    if (this._$this) return this._$this;
    return this.$add();
  }

  $add () {
    let $monster = document.createElement('div');
    $monster.className = 'monster';
    $monster.setAttribute('data-id', encodeURIComponent(this.id));
    Monster.$monsters.appendChild($monster);
    return this._$this = $monster;
  }

  $draw () {
    this.$this.style.left = this.x + 'px'
    this.$this.style.bottom = this.y + 'px';
  }
};
