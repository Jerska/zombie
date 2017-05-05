import Game from './Game.js';

export default class Projectile {
  static SPEED = 192;

  static $projectiles = document.getElementById('projectiles');

  constructor ({x, y, width, height, angle, speed, startTime, damage}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.speed = speed;
    this.damage = damage;
    this.startTime = startTime;
  }

  update ({x, y}) {
    if (x !== undefined) {
      this.x = x;
      if (x <= 0) this.x = 0;
      if (x + this.width >= Game.instance.map.width) {
        this.x = Game.instance.map.width - this.width;
      }
    }
    if (y !== undefined) {
      this.y = y;
      if (y <= 0) this.y = 0;
      if (y + this.height >= Game.instance.map.height) {
        this.y = Game.instance.map.height - this.height;
      }
    }
  }

  move ({previous}) {
    const duration = Game.instance.now - previous;
    const amount = duration / 1000 * Projectile.SPEED * this.speed;
    this.update({
      x: this.x + Math.cos(this.angle) * amount,
      y: this.y + Math.sin(this.angle) * amount
    });
    this.$draw();
  }

  get $this () {
    if (this._$this) return this._$this;
    return this._$this = this.$add();
  }

  $add () {
    let $projectile = document.createElement('div');
    $projectile.className = 'projectile';
    Projectile.$projectiles.appendChild($projectile);
    return this._$this = $projectile;
  }

  $draw () {
    this.$this.style.left = this.x + 'px'
    this.$this.style.bottom = this.y + 'px';
  }

  $destroy() {
    this.$this.remove();
  }
}
