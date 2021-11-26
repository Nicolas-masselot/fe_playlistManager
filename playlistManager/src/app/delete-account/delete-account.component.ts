import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  constructor(private message: MessageService, private service: AuthService) { }

  ngOnInit(): void {
  }

  // executer la fonction après confirmation dans une boîte de dialogue
  deleteAccount():void{
    this.blockUI.start('Loading...');
      this.message.sendMessage('deleteAccount',{account: this.service.userID}).subscribe(
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
}