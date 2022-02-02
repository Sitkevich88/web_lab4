import { Component, OnInit } from '@angular/core';
import {AreaHitService} from "../../services/area-hit.service";
import {PointRequest} from "../../model/PointRequest";
import {CanvasService} from "../../services/canvas.service";
import * as $ from 'jquery';
import {first} from "rxjs";

@Component({
  selector: 'app-area-hit-form',
  templateUrl: './area-hit-form.component.html',
  styleUrls: ['./area-hit-form.component.scss']
})
export class AreaHitFormComponent implements OnInit {
  pointRequest: PointRequest = new PointRequest();
  message:string = '';

  constructor(private areaHitService:AreaHitService, private canvasService: CanvasService) {
  }

  ngOnInit(): void {
    const service = this.canvasService;
    const canvas_new = document.querySelector('canvas');
    this.areaHitService.collectionChange.pipe(first())
      .subscribe((data:any)=>{
        if (canvas_new!=null){
          service.setCanvas(canvas_new);
        }else{
          console.log("Canvas не найден");
        }
      });
    this.canvasService.customObservable.subscribe((message) => {
        this.showErrorMessage(message);
      }
    );
    this.areaHitService.getPoints();
  }

  setX(x:number){}

  setR(r:number){}

  lastX:string|undefined;

  selectX(event:Event){
    const id: string|undefined = (event.target as Element).id;
    if ($("#"+id).is(':checked')){
      if (this.lastX !== undefined){
        $("#"+this.lastX).prop("checked", false);
      }
      this.lastX = id;
      this.pointRequest.x = Number($("#"+id).val());
    }else{
      this.lastX = undefined;
    }
  }

  lastR:string|undefined;

  selectR(event:Event){
    const id: string|undefined = (event.target as Element).id;
    if ($("#"+id).is(':checked')){
      if (this.lastR !== undefined){
        $("#"+this.lastR).prop("checked", false);
      }
      this.lastR = id;
      const r = Number($("#"+id).val());
      this.pointRequest.r = r;
      this.canvasService.loadR(r);
    }else{
      this.lastR = undefined;
      this.canvasService.unloadR();
    }
  }

  keyPressNumbersWithDecimal(event:KeyboardEvent):boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode != 45 && this.pointRequest.y) //todo
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    //this.pointRequest.y = Number(String.fromCharCode(charCode));
    return true;
  }

  addPoint(){
    if(this.pointIsCorrect()){
      this.areaHitService.addPoint(this.pointRequest);
    }
  }

  pointIsCorrect():boolean{

    const x = this.pointRequest.x;
    let y = this.pointRequest.y;
    if (y){
      try {
        y = Number(this.pointRequest.y);
      }catch (e){
        this.showErrorMessage("Y должен быть в числом");
        return false;
      }
    }
    const r = this.pointRequest.r;

    this.pointRequest.y = y;

    if(x===undefined || y===undefined || r===undefined){
      this.showErrorMessage("Все поля обязательны");
      return false;
    }else{
      if (x>=-2 && x<=2 && y>=-3 && y<=5 && r>=-2 && r<=2){
        this.hideErrorMessage();
        return true;
      }else{
        this.showErrorMessage("Y должен быть в интервале от -3 до 5 включительно");
        return false;
      }
    }
  }

  showErrorMessage(message:string){
    this.message = message;
  }

  hasErrorMessage():boolean{
    return this.message.length > 0;
  }

  hideErrorMessage(){
    this.message = "";
  }

  clearPoints(){
    this.areaHitService.deletePoints();
  }

  getPoints(){
    return this.areaHitService.collection;
  }
}
