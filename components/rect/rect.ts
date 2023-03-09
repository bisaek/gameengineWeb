import { window, GameObject, component } from "huggerengine";

export default class rect extends component {
  // public window;
  update() {
    if (!this.window.ctx) return;
    this.window.ctx.fillStyle = this.options.color;
    this.window.ctx.fillRect(
      this.gameObject.x,
      this.gameObject.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }
}
