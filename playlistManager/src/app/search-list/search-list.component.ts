import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../interface/video';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchInput: string = "";

  videos: Video[] = [];

  constructor(private router: Router, private searchService: SearchService) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {searchInput: string};
    this.searchInput = state.searchInput;
 }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    console.log("Search list: ",this.searchInput);
    this.searchService.getVideos(this.searchInput)
      .subscribe((items: any) => {
        this.videos = items.map((item: { snippet: { title: any; channelId: any; channelTitle: any; description: any; publishedAt: string | number | Date; thumbnails: { high: { url: any; }; }; }; id: { videoId: any; }; }) => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
      });
  }
}
