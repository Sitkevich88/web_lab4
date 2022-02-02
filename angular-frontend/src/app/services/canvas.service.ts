import { Injectable } from '@angular/core';
import {AreaHitService} from "./area-hit.service";
import {AreaHitResponse} from "../model/AreaHitResponse";
import {CanvasMousePositionConverterService} from "./canvas-mouse-position-converter.service";
import {PointRequest} from "../model/PointRequest";
import {Subject} from "rxjs";

let canvas: HTMLCanvasElement;
let cx: CanvasRenderingContext2D;
let w: number;
let h:number;
let unit: number;
const scale:number = 5;
let x0:number;
let y0:number;

let counter:number = 0;

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  private r:number|null = null;
  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  constructor(private areaHitService:AreaHitService, private converter:CanvasMousePositionConverterService) {}

  public setCanvas(canvas_new: HTMLCanvasElement){
    canvas = canvas_new;
    this.converter.setCanvasAndScale(canvas, scale);
    const cx_temp = canvas.getContext("2d");
    if(cx_temp!=null){
      cx = cx_temp;
    } else{
      console.log("Canvas context not found");
    }
    w = canvas.width;
    x0 = w/2;
    h = canvas.height;
    y0 = h/2;
    unit = (h / (2*scale))*0.9;
    this.unloadR();
    const _this = this;
    this.areaHitService.collectionChange.subscribe(data=>{
      _this.redraw();
    });
    canvas.addEventListener('click', event=>this.processClick(event));
    counter++;
  }

  private processClick(event:MouseEvent){
    if (this.r!=null){
      this.showErrorMessage("");
      this.sendPointOnClick(event);
    }else{
      this.showErrorMessage("Выберите R");
    }
  }

  public loadR(r:number){
    this.showErrorMessage("");
    this.r = r;
    this.redraw();
  }

  public unloadR(){
    this.showErrorMessage("");
    this.r = null;
    this.redraw();
  }

  private sendPointOnClick(event:MouseEvent){
    const mousePos = this.converter.getMousePosition(event);
    const point:PointRequest = new PointRequest();
    if (this.r!=null){
      point.x = mousePos.x;
      point.y = mousePos.y;
      point.r = this.r;
      this.areaHitService.addPoint(point);
    }
  }

  private showErrorMessage(message:string){
    this.customSubject.next(message);
  }

  private clear(){
    cx.fillStyle = "#FFFFFF";
    cx.beginPath();
    cx.moveTo(0, 0);
    cx.lineTo(0, h);
    cx.lineTo(w, h);
    cx.lineTo(w, 0);
    cx.fill();
  }

  private drawGrid(){
    cx.fillStyle = "#000000";
    cx.beginPath();
    cx.moveTo(0, y0);
    cx.lineTo(2*x0, y0);
    cx.moveTo(x0, 0);
    cx.lineTo(x0, 2*y0);
    cx.closePath();
    cx.stroke();
    cx.font = '20px serif';
    //проставляем числа над осями
    for (let i = -scale; i<=scale; i++){
      if (i<=0){
        cx.fillText(String(i), x0+i*unit-10, y0+15);
      }else {
        cx.fillText(String(i), x0+i*unit-5, y0+15);
      }
      if(i===0){continue;}
      cx.fillText(String(i), x0+2, y0-i*unit+5);
    }
  }

  private drawAreas(r:number){
    r*=unit;

    cx.fillStyle = "#3398fd";

    //first area
    cx.beginPath();
    if (r>=0){
      cx.arc(x0, y0, r, -Math.PI / 2, 0);
    }else{
      cx.arc(x0, y0, -r, -Math.PI, -Math.PI / 2);
    }
    cx.lineTo(x0, y0);
    cx.fill();

    //second area is empty

    //third area
    cx.beginPath();
    cx.moveTo(x0 - r, y0);
    cx.lineTo(x0 - r, y0 + Math.abs(r) / 2);
    cx.lineTo(x0, y0 + Math.abs(r) / 2);
    cx.lineTo(x0, y0);
    cx.fill();

    //fourth area
    cx.beginPath();
    cx.moveTo(x0 + r, y0);
    cx.lineTo(x0, y0 + Math.abs(r) / 2);
    cx.lineTo(x0, y0);
    cx.fill();
  }

  private drawPoints(){
    const points:Array<AreaHitResponse> = this.areaHitService.collection;
    console.log(`I have ${points.length} points to draw`);
    points.forEach(point=>{
      this.drawPoint(point);
    });
  }

  private drawPoint(point:AreaHitResponse){
    if (point.x===undefined || point.y===undefined || point.result===undefined){
      return;
    }
    const x = x0 + point.x * unit;
    const y = y0 - point.y * unit;

    if (point.result){
      cx.fillStyle = "#0fee3c";
    }else {
      cx.fillStyle = "#ee0f22";
    }

    cx.beginPath();
    cx.arc(x, y, 2.8, 0 , Math.PI * 2);
    cx.fill();
  }

  public redraw(){
    this.clear();
    if (this.r!=null){
      this.drawAreas(this.r);
    }
    this.drawGrid();
    this.drawPoints();
  }

}
