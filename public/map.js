export default class Map {
  constructor ({width, height}) {
    this.width = width;
    this.height = height;
  }

  get $this () {
    if (this._$this) return this._$this;
    return this._$this = document.getElementById('map');
  }

  $draw () {
    this.$this.style.width = this.width + 'px';
    this.$this.style.height = this.height + 'px'
    this.$this.style.marginTop = '-' + Math.round(this.width / 2) + 'px';
    this.$this.style.marginLeft = '-' + Math.round(this.width / 2) + 'px';
  }
};
