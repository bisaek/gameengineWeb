import { window, GameObject } from "huggerengine";

export default class rect {
  public gameObject!: GameObject;
  public window!: window;
  public color = "#000000";
  // public window;
  update() {
    if (!this.window.ctx) return;
    this.window.ctx.fillStyle = this.color;
    this.window.ctx.fillRect(
      this.gameObject.x,
      this.gameObject.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }
}
