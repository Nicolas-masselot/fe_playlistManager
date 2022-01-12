import { Component, Inject, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-modify',
  templateUrl: './playlist-modify.component.html',
  styleUrls: ['./playlist-modify.component.scss']
})
export class PlaylistModifyComponent implements OnInit {

  playlistName: string = "";
  playlistDescription: string = "";
  playlistVisibility: string = "";

  @BlockUI()
  blockUI!: NgBlockUI;

  constructor(
    // public activeModal: NgbActiveModal, 
    private message: MessageService, 
    private toastrService: ToastrService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<PlaylistModifyComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) { 
      this.playlistName = data.playlistName;
      this.playlistDescription = data.playlistDescription;
      this.playlistVisibility = data.playlistVisibility;
      console.log(this.playlistVisibility);
    }

  ngOnInit(): void {
  }

  selectVisibility(event: any): void{
    this.playlistVisibility = event.target.value;
  }

  updatePlaylist(): void {

  }

}
