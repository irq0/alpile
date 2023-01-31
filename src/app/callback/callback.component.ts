import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  ok: boolean = false;
  message: string = '';

  constructor(
    private spotify: SpotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((frag) => {
      if (frag) {
        const params = new HttpParams({
          fromString: frag
        });

        const access_token = params.get('access_token');

        if (params.has('error')) {
          this.message = 'Error: ' + params.get('error');
        } else if (access_token) {
          this.message = 'Authorized!';
          this.ok = true;
          this.spotify.finishAuth(access_token);
          this.router.navigate(['/']);
        } else {
          this.message = 'Response error';
          console.log(frag);
        }
      }
    });
  }
}
