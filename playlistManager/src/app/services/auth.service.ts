import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MessageService, BackendData} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  role: string | undefined ;
  userID: string | null = sessionStorage.getItem("UserID");
  LoggedIn: boolean = (this.userID !== null) ;
  userEmail: string | undefined;

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
      sessionStorage.setItem("UserID", String(this.userID));
    } else {
      this.LoggedIn = false ;
      this.role = undefined ;
    }
  }

  logOut(): void {
    this.userEmail = undefined;
    this.userID = null;
    this.LoggedIn = false;
    this.role = undefined;
    sessionStorage.clear();
  }
}
