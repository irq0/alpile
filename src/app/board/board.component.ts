import { CdkDragDrop, CdkDragEnd, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { AlbumTable, PosAlbum } from '../posalbum';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  albums$!: Observable<AlbumTable>;

  constructor(public data: DataService, private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.albums$ = this.data.getAll();
  }

  play(album: PosAlbum) {
    this.spotify.playAlbum(album.album);
  }

  updatePos(event: CdkDragEnd, id: string) {
    this.data.updatePos(id, event.source.getFreeDragPosition());
  }
}
