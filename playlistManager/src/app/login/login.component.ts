import { Component, Input, OnInit } from '@angular/core';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  containerClass: string[] = ['container'];

  faFacebook = faFacebookF;
  faGoogle = faGoogle;
  faApple = faApple;

  login: string = "";
  password: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleRightPanel(value: boolean): void{
    if (value){
      this.containerClass.push('right-panel-active')
    }
    else{
      this.containerClass.pop()
    }
  }

  signIn(): void{

  }

  signUp(): void{
    
  }

}
