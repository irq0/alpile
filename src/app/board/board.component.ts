import { CdkDragDrop, CdkDragEnd, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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

  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  showContextMenu(event: MouseEvent, album: PosAlbum) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { album: album };
    this.contextMenu.openMenu();
  }

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

  dump(album: PosAlbum) {
    console.log(album);
  }

  remove(album: PosAlbum) {
    this.data.remove(album);
  }
}
