import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  containerClass: string[] = ['container'];

  faFacebook = faFacebookF;
  faGoogle = faGoogle;
  faApple = faApple;

  login: string = "";
  password: string = "";
  errorMessageLogin: string | undefined ;
  errorMessageSignup: string | undefined ;

  constructor(
    private toastrService: ToastrService,
    private service: AuthService, 
    private message: MessageService, 
    private router: Router
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

  signIn(email:string,password:string): void{
    this.errorMessageLogin = undefined;

    if (email === '' || password === '') {
      this.errorMessageLogin = 'Veuillez entrer un login et un mot de passe' ;
    } else {
      this.blockUI.start('Loading...');
      this.service.sendAuthentification(email,password).subscribe(
        (response) => {
          this.service.finalizeAuthentification(response);
          if (this.service.LoggedIn) {
            this.router.navigateByUrl(this.service.role+"dashboard").then(()=>{}) ; //route vers les dashboards role renvoyé par le backend + dashboard
          } else {
            this.errorMessageLogin = response.data.reason ;
          }
          this.blockUI.stop();
        },
        (err) => {
          console.log(err) ;
          this.blockUI.stop();
        }
      )
      
    }
  }

  signUp(email:string,password:string,passconfirm:string): void{
    const creationData = {
      email,
      password,
      passconfirm
    }
    this.blockUI.start('Loading...');
    this.errorMessageLogin = undefined;
    this.message.sendMessage('creation',creationData).subscribe(
      (reponse) => {
        console.log(reponse) ;
        this.router.navigateByUrl('').then(()=>{}) ;
        this.blockUI.stop();
      },
      (err)=>{ 
        console.log(err); // message d'erreur
        this.blockUI.stop();
      }
    ) ;

  }

}
