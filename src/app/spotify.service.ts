import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';
import { SearchContent, SimplifiedAlbum } from 'spotify-types';

import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  baseUrl = "https://api.spotify.com/v1";
  authUrl = "https://accounts.spotify.com/authorize/?";
  authParams: HttpParams = new HttpParams()
    .set("response_type", "token")
    .set("client_id", "4dafeb862d55492ba73231173c7bc7e6")
    .set("scope", "user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-modify playlist-modify-public playlist-modify-private")
    .set("redirect_uri", "http://localhost:4200/callback/?")
  accessToken: string = "";

  auth(): void {
    window.open(this.authUrl + this.authParams.toString(), "_self");
  }

  finishAuth(accessToken: string): void {
    this.accessToken = accessToken
  }

  constructor(private http: HttpClient) {
  }

  maybeAuth(): void {
    if (this.accessToken == "") {
      this.auth();
    }
  }

  searchAlbums(term: string): Observable<SimplifiedAlbum[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<SearchContent>(`${this.baseUrl}/search`, {
      responseType: 'json',
      observe: 'body',
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.accessToken,
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('type', 'album')
        .set("limit", 10)
        .set("q", term)
    }).pipe(
      tap(resp => console.log(resp)),
      map(body => body?.albums?.items || []));
  }
}
