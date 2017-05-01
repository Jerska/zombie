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
    const players = Game.instance.players;
    var closer_player;
    var distance;

    players.forEach(player => {
      var dist = Math.sqrt(((player.y - this.y) * (player.y - this.y)) + ((player.x - this.x) * (player.x - this.x)));
      if (dist < distance || !distance) {
        distance = dist;
        closer_player = player;
      }
    });
    

    if (closer_player.x > this.x && closer_player.y > this.y) {
      this.x += 1;
      this.y += 1;
    }

    else if (closer_player.x < this.x && closer_player.y < this.y) {
      this.x -= 1;
      this.y -= 1;
    }

    else if (closer_player.x > this.x && closer_player.y < this.y) {
      this.x += 1;
      this.y -= 1;
    }

    else if (closer_player.x < this.x && closer_player.y > this.y) {
      this.x -= 1;
      this.y += 1;
    }

    else if (closer_player.x > this.x && closer_player.y == this.y)
      this.x += 1;

    else if (closer_player.x < this.x && closer_player.y == this.y)
      this.x -= 1;

    else if (closer_player.x == this.x && closer_player.y > this.y)
      this.y += 1;

    else if (closer_player.x == this.x && closer_player.y < this.y)
      this.y -= 1;
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

  $destroy() {
    this.$this.style.backgroundColor = 'red';
  }
};
