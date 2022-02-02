import { Component, OnInit } from '@angular/core';
import {AreaHitService} from "../../services/area-hit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private areaHitService: AreaHitService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.areaHitService.logout();
  }

  /*private goToLogin(){
    this.router.navigate(['/login']);
  }*/

}
