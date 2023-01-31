import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';
import { SearchContent, SimplifiedAlbum, PublicUser } from 'spotify-types';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = 'https://api.spotify.com/v1';
  authUrl = 'https://accounts.spotify.com/authorize/?';
  authParams: HttpParams = new HttpParams()
    .set('response_type', 'token')
    .set('client_id', '4dafeb862d55492ba73231173c7bc7e6')
    .set(
      'scope',
      'user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-modify playlist-modify-public playlist-modify-private'
    )
    .set('redirect_uri', 'http://localhost:4200/callback/?');
  accessToken: string = '';

  whoAmI: PublicUser | undefined;

  auth(): void {
    window.open(this.authUrl + this.authParams.toString(), '_self');
  }

  authorized(): boolean {
    return this.accessToken != '';
  }

  finishAuth(accessToken: string): void {
    this.accessToken = accessToken;

    this.http
      .get<PublicUser>(`${this.baseUrl}/me`, {
        responseType: 'json',
        observe: 'body',
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        })
      })
      .subscribe((user) => (this.whoAmI = user));
  }

  constructor(private http: HttpClient) {}

  getAlbum(id: string): Observable<SimplifiedAlbum> {
    return this.http
      .get<SimplifiedAlbum>(`${this.baseUrl}/search`, {
        responseType: 'json',
        observe: 'body',
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        }),
        params: new HttpParams().set('id', id)
      })
      .pipe(tap((resp) => console.log(resp)));
  }

  playAlbum(album: SimplifiedAlbum): void {
    this.http
      .put(
        `${this.baseUrl}/me/player/play`,
        {
          context_uri: `spotify:${album.type}:${album.id}`
        },
        {
          responseType: 'json',
          observe: 'body',
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json'
          })
        }
      )
      .subscribe((resp) => console.log(['play album', resp]));
  }

  searchAlbums(term: string): Observable<SimplifiedAlbum[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<SearchContent>(`${this.baseUrl}/search`, {
        responseType: 'json',
        observe: 'body',
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        }),
        params: new HttpParams().set('type', 'album').set('limit', 5).set('q', term)
      })
      .pipe(
        tap((resp) => console.log(resp)),
        map((body) => body?.albums?.items || [])
      );
  }
}
