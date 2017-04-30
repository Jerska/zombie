export default class Monster {
  static $monsters = document.getElementById('monsters');

  static list = [];
  static find (id) {
    if (!Monster.list) return null;
    return Monster.list.find(monster => monster.id === id);
  }

  constructor ({id, x, y}) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  update ({x, y}) {
    if (x && x >= 0 && x <= 768 - 16) {
      this.x = x;
    }
    if (y && y >= 0 && y <= 768 - 16) {
      this.y = y;
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
