import { VideoSaveComponent } from './../video-save/video-save.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Video } from '../interface/video';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  videoId: string = "";
  video: Video | any;

  @BlockUI()
  blockUI!: NgBlockUI;

  constructor(private route: ActivatedRoute, 
    // private saveVideoModalService: NgbModal ,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService, 
    private message: MessageService, 
    private toastrService: ToastrService,
    ) { 
      const navigation = this.router.getCurrentNavigation();
      const state = navigation!.extras.state as {video: Video};
      this.video = state.video;
  }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params["id"];
    console.log(this.video)
    this.saveVideoToHistory();
  }

  saveVideo(): void {
    // const modalRef = this.saveVideoModalService.open(VideoSaveComponent);
    // // modalRef.componentInstance.id = user.id;
		// // modalRef.componentInstance.role = this.role;
		// modalRef.result.then((result) => {
		// console.log(`Closed with: ${result}`);
		// }, (reason) => {
		// console.log(`Dismissed ${reason}`);
		// });
    const dialogRef = this.dialog.open(VideoSaveComponent, {
      data: {video: this.video},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  saveVideoToHistory():void {
    const request = {
      id_video: this.videoId,
      id_user: this.authService.userID,
    };
    console.log(request);
    this.blockUI.start('Loading...');
    this.message.sendMessage('history/createLog',request).subscribe(
      (res:any) => {
      if (res.success){
        this.toastrService.success('Save video to history');
      }else{
        if (res.errorSet.includes('CANNOT_CREATE_DATA')) {
          this.toastrService.error('Cannot save video to history');
        }
      }
      this.blockUI.stop();
    },
    (err)=>{ 
      console.log(err); // message d'erreur
      this.blockUI.stop();
    })
    this.blockUI.stop();
  }
}
