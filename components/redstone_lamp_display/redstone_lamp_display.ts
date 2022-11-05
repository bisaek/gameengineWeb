import { GameObject, window } from "huggerengine";
import sprite from "huggerengine-sprite";
import offLamp from "./texture/redstone_lamp.png";
import onLamp from "./texture/redstone_lamp_on.png";

class lamp {
  public on = false;
}

export default class redstone_lamp_display {
  public gameObject!: GameObject;
  public window: window | undefined;
  public width = 0;
  public height = 0;
  private lamps: GameObject[] = [];
  start() {
    if (!this.gameObject) return;
    if (!this.window) return;

    for (let height = 0; height <= this.gameObject.height - 16; height += 16) {
      this.height++;
      for (let width = 0; width <= this.gameObject.width - 16; width += 16) {
        if (height == 0) this.width++;
        let newLamp = this.window.createGameObject(
          width + this.gameObject.y,
          height + this.gameObject.x,
          16,
          16
        );
        newLamp.addComponent(new sprite(offLamp, true));
        newLamp.addComponent(new lamp());
        this.lamps.push(newLamp);
      }
    }
  }
  getLampObject(x: number, y: number) {
    return this.lamps[x + y * Math.floor(this.gameObject.width / 16)];
  }
  public on(x: number, y: number) {
    this.getLampObject(x, y).getComponent("sprite").setImg(onLamp);
    this.getLampObject(x, y).getComponent("lamp").on = true;
  }
  /**
   * toogle
   */
  public toogle(x: number, y: number) {
    if (this.getLampObject(x, y).getComponent("lamp").on) {
      this.off(x, y);
    } else {
      this.on(x, y);
    }
  }
  /**png
   * off
   */
  public off(x: number, y: number) {
    this.lamps[x + y * Math.floor(this.gameObject.width / 16)]
      .getComponent("sprite")
      .setImg(offLamp);
    this.lamps[x + y * Math.floor(this.gameObject.width / 16)].getComponent(
      "lamp"
    ).on = false;
  }
}
