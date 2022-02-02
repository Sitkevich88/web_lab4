import { Component, OnInit } from '@angular/core';
import {AreaHitResponse} from "../../model/AreaHitResponse";
import {AreaHitService} from "../../services/area-hit.service";

@Component({
  selector: 'app-area-hit-table',
  templateUrl: './area-hit-table.component.html',
  styleUrls: ['./area-hit-table.component.scss']
})
export class AreaHitTableComponent implements OnInit {

  constructor(private areaHitService:AreaHitService) { }

  getPoints(){
    return this.areaHitService.collection;
  }

  ngOnInit(): void {
  }

}
