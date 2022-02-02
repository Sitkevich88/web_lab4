import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from "../../services/authorisation.service";
import {User} from "../../model/User";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthorisationService]
})
export class RegistrationComponent implements OnInit {

  private service: AuthorisationService;

  signIn:boolean = true;
  user:User;
  errorMessage:string = "";

  willSignIn(){
    this.signIn = true;
    // @ts-ignore
    document.getElementById('signInOption').className = 'active clickable';
    // @ts-ignore
    document.getElementById('signUpOption').className = 'inactive underlineHover clickable';
  }

  willSignUp(){
    this.signIn = false;
    // @ts-ignore
    document.getElementById('signUpOption').className = 'active clickable';
    // @ts-ignore
    document.getElementById('signInOption').className = 'inactive underlineHover clickable';
  }

  constructor(service: AuthorisationService) {
    this.service = service;
    this.user = new User("", "");
  }

  ngOnInit(): void{
    this.service.customObservable.subscribe((message) => {
        this.showErrorMessage(message);
      }
    );
  }

  authorise(){
    this.hideErrorMessage();
    if(this.signIn){
      this.service.signIn(this.user);
    }else{
      this.service.signUp(this.user);
    }
  }

  public showErrorMessage(message:string){
    this.errorMessage = message;
  }

  public hideErrorMessage(){
    this.errorMessage = "";
  }

  hasMessage():boolean{
    return ((typeof this.errorMessage) === 'string' && this.errorMessage.length > 0);
  }

}
