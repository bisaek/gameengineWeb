export default class rect {
  public gameObject;
  public window;
  public color = "#000000";
  // public window;
  update() {
    // if (!this.ctx) return;
    this.window.ctx.fillStyle = this.color;
    this.window.ctx.fillRect(
      this.gameObject.x,
      this.gameObject.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }
}
