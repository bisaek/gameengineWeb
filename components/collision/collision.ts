import { GameObject, window, component } from "huggerengine";

// let collisions = [];

export default class collision extends component {
  public collisionSides = {
    right: false,
    bottom: false,
    left: false,
    top: false,
  };
  public id = "collision";
  public collisionObjects: GameObject[] = [];

  public collisionRect = false;

  start() {
    this.setDefualtOptions({ collisionRect: false, id: "collision" });
  }
  update() {
    this.checkForCollision();
  }

  checkForCollision() {
    this.collisionSides.right = false;
    this.collisionSides.left = false;
    this.collisionSides.top = false;
    this.collisionSides.bottom = false;
    this.collisionObjects = [];

    this.window.GameObjects.forEach((otherGameObject: GameObject) => {
      if (this.gameObject === otherGameObject) return;
      if (!otherGameObject.getComponent("collision")) return;

      if (
        this.gameObject.x + this.gameObject.width > otherGameObject.x &&
        this.gameObject.x < otherGameObject.x + otherGameObject.width &&
        this.gameObject.y + this.gameObject.height > otherGameObject.y &&
        this.gameObject.y - otherGameObject.height < otherGameObject.y
      ) {
        {
          this.collisionSides.right = true;
          this.collisionObjects.push(otherGameObject);
        }
      }

      if (
        this.gameObject.x < otherGameObject.x + otherGameObject.width &&
        this.gameObject.x > otherGameObject.x &&
        this.gameObject.y + this.gameObject.height > otherGameObject.y &&
        this.gameObject.y - otherGameObject.height < otherGameObject.y
      ) {
        this.collisionSides.left = true;
        this.collisionObjects.push(otherGameObject);
      }

      if (
        this.gameObject.x < otherGameObject.x + otherGameObject.width &&
        this.gameObject.x + this.gameObject.width > otherGameObject.x &&
        this.gameObject.y + this.gameObject.height > otherGameObject.y &&
        this.gameObject.y - otherGameObject.height < otherGameObject.y + 20
      ) {
        this.collisionSides.top = true;
        this.collisionObjects.push(otherGameObject);
      }

      if (
        this.gameObject.x < otherGameObject.x + otherGameObject.width &&
        this.gameObject.x + this.gameObject.width > otherGameObject.x &&
        this.gameObject.y + this.gameObject.height > otherGameObject.y - 2 &&
        this.gameObject.y - otherGameObject.height < otherGameObject.y
      ) {
        this.collisionSides.bottom = true;
        this.collisionObjects.push(otherGameObject);
      }
    });
    // console.log(this.collisionObjects);

    if (this.collisionRect) {
      if (!this.window.ctx) return;
      this.window.ctx.beginPath();
      this.window.ctx.rect(
        this.gameObject.x,
        this.gameObject.y,
        this.gameObject.width,
        this.gameObject.height
      );
      this.window.ctx.stroke();
    }
  }
}
