import { VideoSaveComponent } from './../video-save/video-save.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  videoUrl: string = "";

  constructor(private route: ActivatedRoute, private saveVideoModalService: NgbModal ,) { 

  }

  ngOnInit(): void {
    this.videoUrl = this.route.snapshot.params["id"];
  }

  saveVideo(): void {
    const modalRef = this.saveVideoModalService.open(VideoSaveComponent);
    // modalRef.componentInstance.id = user.id;
		// modalRef.componentInstance.role = this.role;
		modalRef.result.then((result) => {
		console.log(`Closed with: ${result}`);
		}, (reason) => {
		console.log(`Dismissed ${reason}`);
		});

  }
}
