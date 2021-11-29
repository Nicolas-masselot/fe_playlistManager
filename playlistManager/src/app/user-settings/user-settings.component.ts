import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  currentpassword:string | undefined;
  newpassword:string | undefined;
  newconfirm:string | undefined;
  faEye = faEye ;
  faEyeSlash = faEyeSlash ;
  showCurrent = false;
  showNewPass = false ;
  showNewConfirm = false; 

  constructor(private message: MessageService, private service: AuthService ) { }

  ngOnInit(): void {
  }

  SaveChanges():void {
      this.blockUI.start('Loading...');
      this.message.sendMessage('changePassword',{account: this.service.userID ,currentpass: this.currentpassword, newpass: this.newpassword,newpassconf: this.newconfirm}).subscribe(
        (response) => {
          console.log(response);
          this.blockUI.stop();
        },
        (err) => {
          console.log(err) ; //message d'erreur
          this.blockUI.stop();
        }
      )
  }

  showPasswords(champMdp: number):void {
    switch (champMdp) {
      case 1:
        this.showCurrent = !this.showCurrent;
        break;
      case 2:
        this.showNewPass = !this.showNewPass;  
        break;
      case 3:
        this.showNewConfirm = !this.showNewConfirm ;
        break;
      default:
        break;
    }
  }
}
