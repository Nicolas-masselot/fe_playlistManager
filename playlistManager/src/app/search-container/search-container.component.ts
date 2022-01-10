import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Video } from '../interface/video';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  
  videos: Video[] = [];
  // inputTouched = false;
  // loading = false;

  constructor(private router: Router, private searchService: SearchService) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {searchInput: string};
    this.onSearch(state.searchInput);
 }

  ngOnInit(): void {
  }

  onSearch(searchInput: string): void {
    console.log("Search container: ",searchInput);
    this.blockUI.start('Loading...');
    this.searchService.getVideos(searchInput)
      .subscribe((items: any) => {
        this.videos = items.map((item: { snippet: { title: any; channelId: any; channelTitle: any; description: any; publishedAt: string | number | Date; thumbnails: { high: { url: any; }; }; }; id: { videoId: any; }; }) => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: item.id.videoId,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
        // console.log(this.videos);
        this.blockUI.stop();
      });
    this.blockUI.stop();
  }

}
