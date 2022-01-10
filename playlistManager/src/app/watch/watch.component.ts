import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  videoUrl: string = "";

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.videoUrl = this.route.snapshot.params["id"];
  }
}
