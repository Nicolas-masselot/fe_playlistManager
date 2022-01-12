import { PlaylistModifyComponent } from './../playlist-modify/playlist-modify.component';
import { Playlist } from './../interface/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../interface/video';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  
  playlist!: Playlist;
  playlistVideo!: Video[]; 
  playlistId: string = "";
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService, 
    private message: MessageService, 
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.params["id"];
    this.getPlaylistById();
    this.getVideosOfPlaylist();
  }

  getPlaylistById(): void {
    this.blockUI.start('Loading...');
    const request = {
      _id: this.playlistId,
    };
    this.message.sendMessage('playlist/getById',request).subscribe((res:any) => {
      if (res.success){
        // console.log(res.data);
        // console.log(res.data[0].id_user)
        this.playlist = res.data.map((playlist: {date_add:Date | any, description: string, name: string, status:string, thumbnail:string, videos:[], _id: string }) => {
          return {
            title: playlist.name,
            description: playlist.description,
            publishedAt: new Date(playlist.date_add),
            thumbnail: (playlist.thumbnail !== "") ? playlist.thumbnail : "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault_live.jpg",
            playlistId: playlist._id,
            channelTitle: this.authService.userEmail,
            status: playlist.status.toUpperCase(),
          }
        })[0];
        console.log("Playlist: ", this.playlist);
        this.blockUI.stop();
      }
      else{
        if (res.errorSet.includes('PLAYLIST_NOT_FOUND')) {
          this.toastrService.error('Playlist not found');
        }
        this.blockUI.stop();
      }
    },
    (err)=>{ 
      console.log(err); // message d'erreur
      this.blockUI.stop();
    })
    this.blockUI.stop();
  }

  getVideosOfPlaylist() : void {
  //   this.playlistVideo = [
  //     {
  //         title: "Adele - Easy On Me (Live at the NRJ Awards 2021)",
  //         videoId: "ffcitRgiNDs",
  //         videoUrl: "https://www.youtube.com/watch?v=ffcitRgiNDs",
  //         channelId: "UComP_epzeKzvBX156r6pm1Q",
  //         channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
  //         channelTitle: "AdeleVEVO",
  //         description: "\"Easy On Me\" by Adele, Live at the NRJ Awards 2021. Shop the \"Adele\" collection here: http://shop.adele.com Listen to \"30\" here: ...",
  //         publishedAt: new Date("2021-11-23T15:00:17.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/ffcitRgiNDs/hqdefault.jpg"
  //     },
  //     {
  //         title: "Adele - Hello",
  //         videoId: "YQHsXMglC9A",
  //         videoUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
  //         channelId: "UComP_epzeKzvBX156r6pm1Q",
  //         channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
  //         channelTitle: "AdeleVEVO",
  //         description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
  //         publishedAt: new Date("2015-10-23T06:54:18.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg"
  //     },
  //     {
  //         title: "Billboard hot 100 This Week🍍ADELE, Maroon 5, Bilie Eilish, Taylor Swift, Sam Smith, Rihana🍍🍍Pop Hits",
  //         videoId: "zwdWWgOTRKI",
  //         videoUrl: "https://www.youtube.com/watch?v=zwdWWgOTRKI",
  //         channelId: "UCKU0iO0axnimO3b0G-BOO_g",
  //         channelUrl: "https://www.youtube.com/channel/UCKU0iO0axnimO3b0G-BOO_g",
  //         channelTitle: "Music UC",
  //         description: "Billboard hot 100 This Week  ADELE, Maroon 5, Bilie Eilish, Taylor Swift, Sam Smith, Rihana    Pop Hits #TopHits2022 ...",
  //         publishedAt: new Date("2022-01-07T08:32:16.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/zwdWWgOTRKI/hqdefault_live.jpg"
  //     },
  //     {
  //         title: "Adele - Someone Like You (Official Music Video)",
  //         videoId: "hLQl3WQQoQ0",
  //         videoUrl: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
  //         channelId: "UComP_epzeKzvBX156r6pm1Q",
  //         channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
  //         channelTitle: "AdeleVEVO",
  //         description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
  //         publishedAt: new Date("2011-09-29T23:56:00.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/hqdefault.jpg"
  //     },
  //     {
  //         title: "Adele - Rolling in the Deep (Official Music Video)",
  //         videoId: "rYEDA3JcQqw",
  //         videoUrl: "https://www.youtube.com/watch?v=rYEDA3JcQqw",
  //         channelId: "UComP_epzeKzvBX156r6pm1Q",
  //         channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
  //         channelTitle: "AdeleVEVO",
  //         description: "Listen to \"Easy On Me\" here: http://Adele.lnk.to/EOM Pre-order Adele's new album \"30\" before its release on November 19: ...",
  //         publishedAt: new Date("2010-11-30T23:29:12.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/rYEDA3JcQqw/hqdefault.jpg"
  //     },
  //     {
  //         title: "Adele - Easy On Me (Official Lyric Video)",
  //         videoId: "X-yIEMduRXk",
  //         videoUrl: "https://www.youtube.com/watch?v=X-yIEMduRXk",
  //         channelId: "UComP_epzeKzvBX156r6pm1Q",
  //         channelUrl: "https://www.youtube.com/channel/UComP_epzeKzvBX156r6pm1Q",
  //         channelTitle: "AdeleVEVO",
  //         description: "Lyric Video for \"Easy On Me\" by Adele. Shop the \"Adele\" collection here: http://shop.adele.com Listen to \"30\" here: ...",
  //         publishedAt: new Date("2021-11-19T05:00:21.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/X-yIEMduRXk/hqdefault.jpg"
  //     },
  //     {
  //         title: "A.d.e.l.e Songs Playlist 2021 - Top Tracks 2021 Playlist - Billboard Best Singer A.d.e.l.e GREATEST",
  //         videoId: "pwMzcjHizCM",
  //         videoUrl: "https://www.youtube.com/watch?v=pwMzcjHizCM",
  //         channelId: "UCeZbb8LD2nUCO2fd-FguWfw",
  //         channelUrl: "https://www.youtube.com/channel/UCeZbb8LD2nUCO2fd-FguWfw",
  //         channelTitle: "Time Songs",
  //         description: "A.d.e.l.e Songs Playlist 2021 - Top Tracks 2021 Playlist - Billboard Best Singer A.d.e.l.e GREATEST.",
  //         publishedAt: new Date("2021-11-03T08:38:19.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/pwMzcjHizCM/hqdefault.jpg"
  //     },
  //     {
  //         title: "adele songs 2021 - Best Of Adele Greatest Hits Full Album 2021",
  //         videoId: "xq0taGNb-CQ",
  //         videoUrl: "https://www.youtube.com/watch?v=xq0taGNb-CQ",
  //         channelId: "UCeZbb8LD2nUCO2fd-FguWfw",
  //         channelUrl: "https://www.youtube.com/channel/UCeZbb8LD2nUCO2fd-FguWfw",
  //         channelTitle: "Time Songs",
  //         description: "adele songs 2021 - Best Of Adele Greatest Hits Full Album 2021.",
  //         publishedAt: new Date("2021-10-17T13:09:25.000Z"),
  //         thumbnail: "https://i.ytimg.com/vi/xq0taGNb-CQ/hqdefault.jpg"
  //     },
  // ];
    this.blockUI.start('Loading...');
    const request = {
      _id: this.playlistId,
    };
    this.message.sendMessage('playlist/getVideos',request).subscribe((res:any) => {
      if (res.success){
        console.log(res.data);
        // console.log(res.data[0].id_user)
        // this.playlistVideo = res.data.map((video: {date_add:Date | any, description: string, name: string, status:string, thumbnail:string, videos:[], _id: string }) => {
        //   return {
        //     title: video.name,
        //     description: video.description,
        //     publishedAt: new Date(video.date_add),
        //     thumbnail: (video.thumbnail !== "") ? video.thumbnail : "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault_live.jpg",
        //     playlistId: video._id,
        //     channelTitle: this.authService.userEmail,
        //     status: video.status.toUpperCase(),
        //   }
        // })[0];
        // console.log("Playlist: ", this.playlistVideo);
        this.blockUI.stop();
      }
      else{
        // if (res.errorSet.includes('PLAYLIST_NOT_FOUND')) {
        //   this.toastrService.error('Playlist not found');
        // }
        this.blockUI.stop();
      }
    },
    (err)=>{ 
      console.log(err); // message d'erreur
      this.blockUI.stop();
    })
    this.blockUI.stop();    

  }

  modifyPlaylist():void {
    // const modalRef = this.modifyPlaylistModalService.open(PlaylistModifyComponent);
    // modalRef.componentInstance.playlistName = this.playlist.title;
		// modalRef.componentInstance.playlistDescription = this.playlist.description;
    // modalRef.componentInstance.playlistVisibility = this.playlist.status;
		// modalRef.result.then((result) => {
		// 	this.getPlaylistById();
		// // console.log(`Closed with: ${result}`);
		// }, (reason) => {
		// 	this.getPlaylistById();
		// // console.log(`Dismissed ${this.getDismissReason(reason)}`);
		// });
    const dialogRef = this.dialog.open(PlaylistModifyComponent, {
      //width: '250px',
      data: {
        playlistName: this.playlist.title, 
        playlistDescription: this.playlist.description,
        playlistVisibility: this.playlist.status
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  deletePlaylist():void{
    if (confirm("Are you sure you want to delete this playlist ? (this action is irreversible)")) {
      this.blockUI.start('Loading...');
      this.message.sendMessage('playlist/deletePlaylist',{_id: this.playlistId}).subscribe(
        (res:any) => {
          console.log(res);
          if (res.success){
            this.toastrService.success('Playlist deleted');
            this.router.navigate(['dashboardUser']);
          }
          else if (res.errorSet.includes('ID_NOT_FOUND')) {
            this.toastrService.error('Playlist not exist');
          }
          this.blockUI.stop();
        },
        (err) => {
          console.log(err) ; //message d'erreur
          this.blockUI.stop();
        }
      )
      this.blockUI.stop();
    }
  }

  watchVideo(videoUrl: string):void{
    console.log("video: ",videoUrl);
    const url = "watch/" + videoUrl;
    this.router.navigateByUrl(url);
  }

  deleteVideo(videoId: string):void {

  }
}
