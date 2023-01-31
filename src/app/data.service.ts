import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PosAlbum, AlbumTable } from './posalbum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  albums: AlbumTable = {};

  constructor() {}

  load(): void {
    const j = JSON.parse(localStorage.getItem('positions') || '{}');
    this.albums = j as AlbumTable;
  }

  store(): void {
    localStorage.setItem('positions', JSON.stringify(this.albums));
  }

  getAll(): Observable<AlbumTable> {
    this.load();
    return of(this.albums);
  }

  updatePos(id: string, pos: { x: number; y: number }) {
    this.albums[id].pos = pos;
    this.store();
  }

  add(album: PosAlbum) {
    this.albums[album.album.id] = album;
    this.store();
  }

  remove(album: PosAlbum) {
    delete this.albums[album.album.id];
    this.store();
  }
}
