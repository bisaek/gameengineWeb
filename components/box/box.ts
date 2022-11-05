import { window } from "huggerengine";

function point(x: number, y: number, canvas: CanvasRenderingContext2D) {
  canvas.beginPath();
  canvas.arc(x, y, 5, 0, 2 * Math.PI, true);
  canvas.fill();
}
class POINT3D {
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export default class box {
  public window!: window;
  private verticels!: POINT3D[];
  private edges!: number[][];
  private cx!: number;
  private cy!: number;
  private cz: number = 0;
  private size!: number;
  start() {
    this.cx = this.window.getWidth() / 2;
    this.cy = this.window.getHeight() / 2;
    this.size = this.window.getHeight() / 4;

    this.verticels = [
      new POINT3D(
        this.cx - this.size,
        this.cy - this.size,
        this.cz - this.size
      ),
      new POINT3D(
        this.cx + this.size,
        this.cy - this.size,
        this.cz - this.size
      ),
      new POINT3D(
        this.cx + this.size,
        this.cy + this.size,
        this.cz - this.size
      ),
      new POINT3D(
        this.cx - this.size,
        this.cy + this.size,
        this.cz - this.size
      ),
      new POINT3D(
        this.cx - this.size,
        this.cy - this.size,
        this.cz + this.size
      ),
      new POINT3D(
        this.cx + this.size,
        this.cy - this.size,
        this.cz + this.size
      ),
      new POINT3D(
        this.cx + this.size,
        this.cy + this.size,
        this.cz + this.size
      ),
      new POINT3D(
        this.cx - this.size,
        this.cy + this.size,
        this.cz + this.size
      ),
    ];

    this.edges = [
      [0, 1, 2, 3], // back
      [4, 5, 6, 7], // front
      // [0, 4, 6, 3], // connection
      // [1, 5],
      // [2, 6],
      // [3, 7],
    ];
  }
  update() {
    if (!this.window.ctx) return;
    for (let verticel of this.verticels) {
      this.window.ctx.fillStyle = "black";
      point(verticel.x, verticel.y, this.window.ctx);
    }

    // this.edges.sort((a, b) => {});

    for (let edge of this.edges) {
      let color = "blue";
      if (edge[0] == 4) color = "red";
      this.window.ctx.fillStyle = color;

      this.window.ctx.beginPath();
      this.window.ctx.moveTo(
        this.verticels[edge[0]].x,
        this.verticels[edge[0]].y
      );
      for (let point of edge) {
        this.window.ctx.lineTo(
          this.verticels[point].x,
          this.verticels[point].y
        );
      }
      this.window.ctx.lineTo(
        this.verticels[edge[0]].x,
        this.verticels[edge[0]].y
      );
      this.window.ctx.closePath();
      this.window.ctx.fill();
    }
  }

  rotateZ(speed: number) {
    for (let v of this.verticels) {
      let dx = v.x - this.cx;
      let dy = v.y - this.cy;
      let x = dx * Math.cos(speed) - dy * Math.sin(speed);
      let y = dx * Math.sin(speed) + dy * Math.cos(speed);
      v.x = x + this.cx;
      v.y = y + this.cy;
    }
  }
  rotateX(speed: number) {
    for (let v of this.verticels) {
      let dy = v.y - this.cy;
      let dz = v.z - this.cz;
      let y = dy * Math.cos(speed) - dz * Math.sin(speed);
      let z = dy * Math.sin(speed) + dz * Math.cos(speed);
      v.y = y + this.cy;
      v.z = z + this.cz;
    }
  }
  rotateY(speed: number) {
    for (let v of this.verticels) {
      let dx = v.x - this.cx;
      let dz = v.z - this.cz;
      let x = dz * Math.sin(speed) + dx * Math.cos(speed);
      let z = dz * Math.cos(speed) - dx * Math.sin(speed);
      v.x = x + this.cx;
      v.z = z + this.cz;
    }
  }
}
