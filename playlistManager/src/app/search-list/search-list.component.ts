import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../interface/video';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() videos: Video[] = [];

  constructor(private router: Router) { 
 }

  ngOnInit(): void {
  }

  watchVideo(videoUrl: string){
    console.log("video: ",videoUrl);
    const url = "watch/" + videoUrl;
    this.router.navigateByUrl(url);
  }
}
