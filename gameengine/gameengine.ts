// import collision from "./components/collision";
// import rect from "./components/rect";
// import sprite from "./components/sprite";
// import rigidbody from "./components/rigidbody";

interface Options {
  width: number;
  height: number;
}

type ListenerFunction = (e: MouseEvent) => void;

// const components = { rect, collision, sprite, rigidbody };

class GameObject {
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public window: window;
  public components: Array<any> = [];

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    window: window
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.window = window;
  }

  addComponent(component: any) {
    component.gameObject = this;
    component.window = this.window;
    if (component.start) component.start();
    this.components.push(component);
  }
  getComponent(c: string) {
    return this.components.find(
      (component) => component.constructor.name === c
    );
  }
}

// type componentType = Parameters<com>;

class window {
  private canvas: HTMLCanvasElement | null;
  public ctx;
  public GameObjects: GameObject[] = [];
  private keyDowns: String[] = [];
  private keyPresses: String[] = [];
  private height;
  private width;
  private t0 = performance.now();
  private t1: number = 0;
  public deltaTime = 0;
  public mouseDown = false;
  public touch = false;

  public update: Function = () => {};

  constructor(canvasSelector: string, options: Options) {
    this.canvas = document.querySelector(canvasSelector);
    if (!this.canvas) return;

    // this.canvas.requestFullscreen();

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;
    this.canvas.width = options.width || 200;
    this.canvas.height = options.height || 200;
    this.height = options.height || 200;
    this.width = options.width || 200;

    addEventListener("keydown", (e: KeyboardEvent) => {
      if (!this.keyDowns.includes(e.key)) this.keyDowns.push(e.key);
      this.keyPresses.push(e.key);
    });
    addEventListener("keyup", (e: KeyboardEvent) => {
      if (this.keyDowns.includes(e.key))
        this.keyDowns.splice(this.keyDowns.indexOf(e.key), 1);
    });
    addEventListener("mousedown", (e: MouseEvent) => {
      this.mouseDown = true;
    });
    addEventListener("mouseup", (e: MouseEvent) => {
      this.mouseDown = false;
    });
    this.canvas.addEventListener("touchstart", (e: TouchEvent) => {
      this.touch = true;
    });
    this.canvas.addEventListener("touchend", (e: TouchEvent) => {
      this.touch = false;
    });
    this.canvas.addEventListener("touchcancel", (e: TouchEvent) => {
      this.touch = false;
    });

    this.Update();
  }

  getHeight() {
    if (!this.height) return 0;
    return this.height;
  }
  getWidth() {
    if (!this.width) return 0;
    return this.width;
  }

  // async fullscreen(){

  // }

  Update() {
    if (!this.ctx) return;
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.GameObjects.forEach((element) => {
      element.components.forEach((component) => {
        if (component.update) component.update();
      });

      // if (!this.ctx) return;
      // this.ctx.fillRect(element.x, element.y, element.width, element.height);
    });
    // this.deltaTime = performance.now() - this.deltaTime;
    this.t1 = performance.now();
    this.deltaTime = (this.t1 - this.t0) / 1000;
    // console.log(Math.round(1000 / (this.t1 - this.t0)));
    this.t0 = performance.now();
    this.update();

    this.keyPresses = [];
    requestAnimationFrame(() => this.Update());
  }

  // mouseDown(listenerFunction: ListenerFunction) {
  //   this.canvas?.addEventListener("mousedown", listenerFunction);
  // }
  createGameObject(x: number, y: number, height: number, width: number) {
    let gameObject = new GameObject(x, y, height, width, this);
    this.GameObjects.push(gameObject);
    return gameObject;
  }
  keyDown(key: string) {
    return this.keyDowns.includes(key);
  }
  keyPress(key: string) {
    return this.keyPresses.includes(key);
  }
  //   createrect(x: number, y: number, height: number, width: number) {
  //     let gameObject = new GameObject(x, y, height, width, this);
  //     gameObject.addComponent(new rect());
  //     gameObject.addComponent(new collision());
  //     this.GameObjects.push(gameObject);
  //     return gameObject;
  //   }
  //   createSprite(x: number, y: number, img: string) {
  //     let gameObject = new GameObject(x, y, 0, 0, this);
  //     gameObject.addComponent(new sprite(img, true));
  //     gameObject.addComponent(new collision());
  //     this.GameObjects.push(gameObject);
  //     return gameObject;
  //   }
}

export { window, GameObject };
