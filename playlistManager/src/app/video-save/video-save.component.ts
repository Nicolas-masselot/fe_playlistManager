import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-video-save',
  templateUrl: './video-save.component.html',
  styleUrls: ['./video-save.component.scss']
})
export class VideoSaveComponent implements OnInit {

  @BlockUI()
  blockUI!: NgBlockUI;

  // playlistName: string = "";
  selectedValue: string = "";
  playlistList:string[] = [
    "1","2","3"
  ];

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  options = [
    { value: '1', label: 'Playlist 1' },
    { value: '2', label: 'Playlist 2' },
    { value: '3', label: 'Playlist 3' },
  ];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  addToPlaylist(): void {

  }

}