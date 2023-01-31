import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private spotify: SpotifyService) {}

  auth(): void {
    this.spotify.auth();
  }

  label(): string {
    if (this.spotify.authorized()) {
      return `Authorized: ${this.spotify.whoAmI?.display_name}`;
    } else {
      return 'Authorize';
    }
  }

  ngOnInit(): void {}
}
