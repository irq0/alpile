import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.spotify.auth()
  }
}
