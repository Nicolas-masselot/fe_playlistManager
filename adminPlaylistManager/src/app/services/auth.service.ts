import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MessageService, BackendData} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  LoggedIn: boolean | undefined ;
  role: string | undefined ;
  userID: number | undefined;
  mailUser: string | undefined ;

  constructor(private service: MessageService) { }

  sendAuthentification(login: string , password: string): Observable<BackendData> {
    const requete = {
      login,
      password
    };
    return this.service.sendMessage('checkLogin', requete); //url temporaire
  }

  finalizeAuthentification(reponse: BackendData): void {
    if (reponse.status === 'ok'){
      this.LoggedIn = true ;
      this.role = reponse.data.role ;
      this.userID = reponse.data.userID ;
      this.mailUser = reponse.data.mail ;
    } else {
      this.LoggedIn = false ;
      this.role = undefined ;
    }
  }
}