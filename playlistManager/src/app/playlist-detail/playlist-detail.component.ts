import { Playlist } from './../interface/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../interface/video';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {

  playlist!: Playlist;
  playlistVideo!: Video[]; 
  videoId: string = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params["id"];
    this.getPlaylistById();
    this.getVideosOfPlaylist();
  }

  getPlaylistById(): void {
    this.playlist = {
      title: "Playlist 1",
      playlistId: "ffcitRgiNDs",
      playlistUrl: "https://www.youtube.com/watch?v=ffcitRgiNDs",
      channelId: "UComP_epzeKzvBX156r6pm1Q",
      channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
      channelTitle: "AdeleVEVO",
      description: "\"Easy On Me\" by Adele, Live at the NRJ Awards 2021. Shop the \"Adele\" collection here: http://shop.adele.com Listen to \"30\" here: ...",
      publishedAt: new Date("2021-11-23T15:00:17.000Z"),
      thumbnail: "https://i.ytimg.com/vi/ffcitRgiNDs/hqdefault.jpg"
    };
  }

  getVideosOfPlaylist() : void {
    this.playlistVideo = [
      {
          title: "Adele - Easy On Me (Live at the NRJ Awards 2021)",
          videoId: "ffcitRgiNDs",
          videoUrl: "https://www.youtube.com/watch?v=ffcitRgiNDs",
          channelId: "UComP_epzeKzvBX156r6pm1Q",
          channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
          channelTitle: "AdeleVEVO",
          description: "\"Easy On Me\" by Adele, Live at the NRJ Awards 2021. Shop the \"Adele\" collection here: http://shop.adele.com Listen to \"30\" here: ...",
          publishedAt: new Date("2021-11-23T15:00:17.000Z"),
          thumbnail: "https://i.ytimg.com/vi/ffcitRgiNDs/hqdefault.jpg"
      },
      {
          title: "Adele - Hello",
          videoId: "YQHsXMglC9A",
          videoUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
          channelId: "UComP_epzeKzvBX156r6pm1Q",
          channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
          channelTitle: "AdeleVEVO",
          description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
          publishedAt: new Date("2015-10-23T06:54:18.000Z"),
          thumbnail: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg"
      },
      {
          title: "Billboard hot 100 This Week🍍ADELE, Maroon 5, Bilie Eilish, Taylor Swift, Sam Smith, Rihana🍍🍍Pop Hits",
          videoId: "zwdWWgOTRKI",
          videoUrl: "https://www.youtube.com/watch?v=zwdWWgOTRKI",
          channelId: "UCKU0iO0axnimO3b0G-BOO_g",
          channelUrl: "https://www.youtube.com/channel/UCKU0iO0axnimO3b0G-BOO_g",
          channelTitle: "Music UC",
          description: "Billboard hot 100 This Week  ADELE, Maroon 5, Bilie Eilish, Taylor Swift, Sam Smith, Rihana    Pop Hits #TopHits2022 ...",
          publishedAt: new Date("2022-01-07T08:32:16.000Z"),
          thumbnail: "https://i.ytimg.com/vi/zwdWWgOTRKI/hqdefault_live.jpg"
      },
      {
          title: "Adele - Someone Like You (Official Music Video)",
          videoId: "hLQl3WQQoQ0",
          videoUrl: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
          channelId: "UComP_epzeKzvBX156r6pm1Q",
          channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
          channelTitle: "AdeleVEVO",
          description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
          publishedAt: new Date("2011-09-29T23:56:00.000Z"),
          thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/hqdefault.jpg"
      },
      {
          title: "Adele - Rolling in the Deep (Official Music Video)",
          videoId: "rYEDA3JcQqw",
          videoUrl: "https://www.youtube.com/watch?v=rYEDA3JcQqw",
          channelId: "UComP_epzeKzvBX156r6pm1Q",
          channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
          channelTitle: "AdeleVEVO",
          description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
          publishedAt: new Date("2010-11-30T23:29:12.000Z"),
          thumbnail: "https://i.ytimg.com/vi/rYEDA3JcQqw/hqdefault.jpg"
      },
      {
          title: "Adele - Easy On Me (Official Lyric Video)",
          videoId: "X-yIEMduRXk",
          videoUrl: "https://www.youtube.com/watch?v=X-yIEMduRXk",
          channelId: "UComP_epzeKzvBX156r6pm1Q",
          channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
          channelTitle: "AdeleVEVO",
          description: "Lyric Video for \"Easy On Me\" by Adele. Shop the \"Adele\" collection here: http://shop.adele.com Listen to \"30\" here: ...",
          publishedAt: new Date("2021-11-19T05:00:21.000Z"),
          thumbnail: "https://i.ytimg.com/vi/X-yIEMduRXk/hqdefault.jpg"
      },
      {
          title: "A.d.e.l.e Songs Playlist 2021 - Top Tracks 2021 Playlist - Billboard Best Singer A.d.e.l.e GREATEST",
          videoId: "pwMzcjHizCM",
          videoUrl: "https://www.youtube.com/watch?v=pwMzcjHizCM",
          channelId: "UCeZbb8LD2nUCO2fd-FguWfw",
          channelUrl: "https://www.youtube.com/channel/UCeZbb8LD2nUCO2fd-FguWfw",
          channelTitle: "Time Songs",
          description: "A.d.e.l.e Songs Playlist 2021 - Top Tracks 2021 Playlist - Billboard Best Singer A.d.e.l.e GREATEST.",
          publishedAt: new Date("2021-11-03T08:38:19.000Z"),
          thumbnail: "https://i.ytimg.com/vi/pwMzcjHizCM/hqdefault.jpg"
      },
      {
          title: "adele songs 2021 - Best Of Adele Greatest Hits Full Album 2021",
          videoId: "xq0taGNb-CQ",
          videoUrl: "https://www.youtube.com/watch?v=xq0taGNb-CQ",
          channelId: "UCeZbb8LD2nUCO2fd-FguWfw",
          channelUrl: "https://www.youtube.com/channel/UCeZbb8LD2nUCO2fd-FguWfw",
          channelTitle: "Time Songs",
          description: "adele songs 2021 - Best Of Adele Greatest Hits Full Album 2021.",
          publishedAt: new Date("2021-10-17T13:09:25.000Z"),
          thumbnail: "https://i.ytimg.com/vi/xq0taGNb-CQ/hqdefault.jpg"
      },
  ];
  }

  modifyPlaylist():void {

  }

  deletePlaylist():void{

  }

  watchVideo(videoUrl: string):void{
    console.log("video: ",videoUrl);
    const url = "watch/" + videoUrl;
    this.router.navigateByUrl(url);
  }

  deleteVideo(videoId: string):void {

  }
}