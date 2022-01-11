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

  constructor(private service: MessageService) { }

  sendAuthentification(email: string , password: string): Observable<BackendData> {
    const requete = {
      email:email,
      password:password
    };
    return this.service.sendMessage('user/authenticate', requete); //url temporaire
  }

  finalizeAuthentification(reponse: BackendData): void {
    if (reponse.success){
      this.LoggedIn = true ;
      this.role = reponse.data.id_creator ;
      this.userID = reponse.data._id ;
    } else {
      this.LoggedIn = false ;
      this.role = undefined ;
    }
  }
}
