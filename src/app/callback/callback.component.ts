import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { SpotifyService } from "../spotify.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  ok: boolean = false;
  message: string = "";

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(
      frag => {
        if (frag) {
        const params = new HttpParams({
          fromString: frag
        })

        const access_token = params.get("access_token");

        if (params.has("error")) {
          this.message = "Error: " + params.get("error");
        } else if (access_token) {
          this.message = "Authorized!";
          this.ok = true;
          this.spotify.finishAuth(access_token);
        } else {
          this.message = "Response error";
          console.log(frag);
        }
        }
      }
    );
  }
}
// #access_token=BQBasp2EMhVPUfXtMscIJwf-rnUiC8ffuXyxI0A4LE5Tr0kawTIjzpgQGPtrS8qRcqnwDTGclA6L1hYbkvy4eqsHRPfk52smo5C2BA5uybyrSqMKOC9JhuE0LEin76ehiVsXTonR5XUXGq6z73CzKFh-ajkyER0EPc7hfTmZBfFnC5A_OpDB2SUuoPgmdWbu7dbnMcmjNcYp9B8-PA5RYLR4-wwtGGsNf3b-43GuVl5_94nEH2GWANY&token_type=Bearer&expires_in=3600&state=6f2830fa-f5c1-482e-b048-a6c84bb62480
