import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.scss']
})
export class PlaylistCreateComponent implements OnInit {
  
  playlistName: string = "";
  @BlockUI()
  blockUI!: NgBlockUI;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log("create playlist")
  }

  addPlaylist(): void {

  }

}
