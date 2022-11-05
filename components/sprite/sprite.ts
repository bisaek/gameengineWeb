import { window, GameObject } from "huggerengine";

export default class sprite {
  public window!: window;
  public gameObject!: GameObject;
  public imgPath: string = "";
  public img = new Image();
  public changeSize = false;
  constructor(img: string, changeSize: boolean = true) {
    this.changeSize = changeSize;
    this.setImg(img);
  }
  //   start(){
  //     if(this.changeSize){
  //         this.gameObject.x = t
  //     }
  //   }
  update() {
    if (this.changeSize) {
      this.gameObject.width = this.img.width;
      this.gameObject.height = this.img.height;
    }
    this.window.ctx?.drawImage(this.img, this.gameObject.x, this.gameObject.y);
  }
  setImg(src: string) {
    this.img.src = src;
  }
}
