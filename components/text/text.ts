import { GameObject, window } from "huggerengine";

export default class text {
  id = "text";
  window!: window;
  gameObject!: GameObject;
  size: number = 16;
  text: string = "hello";

  constructor(text: string, size: number = 16) {
    this.size = size;
    this.text = text;
  }

  update() {
    if (!this.window.ctx) return;
    this.window.ctx.fillStyle = "white";
    this.window.ctx.font = this.size + "px Arial";
    this.window.ctx.fillText(this.text, this.gameObject.x, this.gameObject.y);
  }
}
