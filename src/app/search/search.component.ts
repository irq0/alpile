import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SpotifyService } from '../spotify.service'
import { Observable, Subject } from 'rxjs';
import { SimplifiedAlbum } from 'spotify-types';
import {
   debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  albums$!: Observable<SimplifiedAlbum[]>;
  private searchTerms = new Subject<string>();

  constructor(public spotify: SpotifyService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.spotify.maybeAuth();
    this.albums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.spotify.searchAlbums(term)),
    );
  }
}
