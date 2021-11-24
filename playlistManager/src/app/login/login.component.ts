import { Component, Input, OnInit } from '@angular/core';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private toastrService: ToastrService,
  ) { }

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
