import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { Observable, Subject } from 'rxjs';
import { SimplifiedAlbum } from 'spotify-types';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  albums$!: Observable<SimplifiedAlbum[]>;
  private searchTerms = new Subject<string>();
  myControl = new FormControl('');

  constructor(public spotify: SpotifyService, private data: DataService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  add(album: SimplifiedAlbum) {
    this.data.add({
      pos: { x: 100, y: 100 },
      album: album
    });
  }

  ngOnInit(): void {
    this.albums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.spotify.searchAlbums(term))
    );
  }
}
