import { window, GameObject } from "huggerengine";
import collision from "huggerengine-collision";

export default class rigidbody {
  public id = "rigidbody";
  public window!: window;
  public gameObject!: GameObject;
  public collision!: collision;
  public collisionSides = {
    left: false,
    right: false,
    top: false,
    bottom: false,
  };
  public gravity = true;
  public gravity_speed = 0.1;
  private velocity = 1.07;

  start() {
    this.collision = this.gameObject.getComponent("collision");
    if (this.collision) this.collisionSides = this.collision.collisionSides;
    console.log(this.collision);
  }
  update() {
    if (this.gravity) this.moveY(this.gravity_speed);
  }

  moveX(x: number) {
    if (!this.collision) {
      this.gameObject.x += x;
      return;
    }
    this.collision.checkForCollision();
    if (
      (x < 0 && !this.collisionSides.left) ||
      (x > 0 && !this.collisionSides.right)
    ) {
      this.gameObject.x += x;
      this.collision.checkForCollision();

      while (
        (x < 0 && this.collisionSides.left) ||
        (x > 0 && this.collisionSides.right)
      ) {
        if (x > 0) this.gameObject.x -= 1;
        else this.gameObject.x += 1;
        this.collision.checkForCollision();
      }
      this.collision.checkForCollision();
    }
  }
  moveY(y: number) {
    if (!this.collision) {
      this.gameObject.y += y;
      return;
    }
    this.collision.checkForCollision();
    if (
      (y < 0 && !this.collisionSides.top) ||
      (y > 0 && !this.collisionSides.bottom)
    ) {
      if (y > 0) this.gravity_speed *= this.velocity;
      else this.gravity_speed = 0.1;
      this.gameObject.y += y;
      this.collision.checkForCollision();
      // if(y > 0 && this.collisionSides.top){
      //   this.y = ;
      // }
      while (
        (y > 0 && this.collisionSides.top) ||
        (y < 0 && this.collisionSides.bottom)
      ) {
        if (y > 0) {
          this.gameObject.y -= 1;
          // this.gravity_speed = 2;
        } else this.gameObject.y += 1;
        // this.gravity_speed = 0.1;
        this.collision.checkForCollision();
      }
      // if(y > 0 && this.collisionSides.top){
      //   this.gameObject.y =
      // }
      // this.gameObject.y += 1;
    }
    this.collision.checkForCollision();
    // console.log(this.y);
  }
}
