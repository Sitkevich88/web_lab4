import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from "../model/User";
import {JwtToken} from "../model/JwtToken";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AreaHitService} from "./area-hit.service";


@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  private serverLink:string = "http://localhost:21409";
  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  constructor(private  http: HttpClient, private router: Router, private areaHitService:AreaHitService){ }

  showErrorMessage(message:string) {
    this.customSubject.next(message);
  }

  public signUp(user:User){
    return this.sendRequest(user, "/auth/signup");
  }

  public signIn(user:User){
    return this.sendRequest(user, "/auth/signin");
  }

  private sendRequest(user:User, link:string){
    //this.registrationComponent.hideErrorMessage();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // @ts-ignore
    this.http.post( this.serverLink + link, user, { headers: headers , observe: "response"}).subscribe((response: HttpResponse<JwtToken>) => {
      // @ts-ignore
      this.areaHitService.jwt = response.body.jwt;
      this.router.navigate(['/app']);
    }, error => {
      if(error.status==401){
        this.showErrorMessage("Неверный логин или пароль");
      }else{
        this.showErrorMessage("Ошибка ".concat(error.status.toString()));
      }
    });
  }
}
