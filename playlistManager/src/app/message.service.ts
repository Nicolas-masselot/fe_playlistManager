import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendData {
  status: string ;
  data: any ;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  sendMessage(Url:string, data:any): Observable<BackendData> {
    const serveur = environment.server + Url ;
    
    return this.http.post<BackendData>(
      serveur,
      data,
      {withCredentials: true}
    );
  }
}
