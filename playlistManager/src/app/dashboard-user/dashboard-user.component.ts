import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

export interface Playlists{
  nom:string,
  description:string
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})

export class DashboardUserComponent implements OnInit {

  AllPlaylists: Array<Playlists> = [];

  constructor(private message: MessageService, private service:AuthService) { }

  ngOnInit(): void {
    this.message.sendMessage('/getUserPlaylists', {id:this.service.userID }).subscribe(
      (reponse) => { this.AllPlaylists = reponse.data ;},
      (err)=> { console.log(err) ;}
    );

    // fake data /////
    this.AllPlaylists = [{nom:"playlist1",description:"description1"},{nom:"playlist2",description:"description2"},{nom:"playlist3",description:"description3"}]
    ///////////////
  }

}
