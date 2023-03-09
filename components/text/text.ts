import { GameObject, window, component } from "huggerengine";

export default class text extends component {
  id = "text";

  start() {
    this.setDefualtOptions({ size: 16, color: "white" });
  }

  update() {
    if (!this.window.ctx) return;
    this.window.ctx.fillStyle = this.options.color;
    this.window.ctx.font = this.options.size + "px Arial";
    this.window.ctx.fillText(
      this.options.text,
      this.gameObject.x,
      this.gameObject.y
    );
  }
}
