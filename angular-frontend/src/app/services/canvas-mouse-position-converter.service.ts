import { Injectable } from '@angular/core';

let canvas: HTMLCanvasElement;
let scale:number;

@Injectable({
  providedIn: 'root'
})
export class CanvasMousePositionConverterService {

  constructor() { }

  public setCanvasAndScale(canvas_new: HTMLCanvasElement, scale_new:number){
    canvas = canvas_new;
    scale = scale_new;
  }

  //мы определяем координаты клика на canvas
  public getMousePosition(evt:MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: this.convertXtoUnits(evt.clientX - rect.left),
      y: this.convertYtoUnits(evt.clientY - rect.top)
    };
  }

  //в силу масштабируемости окна нужно конвертировать x в реальное значение
  private convertXtoUnits(x:number):number{
    const localWidth = canvas.clientWidth;
    let res:number = (x - localWidth/2)/( localWidth * 0.9/ (2*scale));
    return Number(res.toFixed(3));
  }

  //в силу масштабируемости окна нужно конвертировать y в реальное значение
  private convertYtoUnits(y:number):number{
    const localHeight = canvas.clientHeight;
    let res = (localHeight/2 - y)/(localHeight * 0.9 / (2*scale));
    return Number(res.toFixed(3));
  }
}
