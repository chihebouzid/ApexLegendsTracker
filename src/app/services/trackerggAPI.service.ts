import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TrackerAPIService {
  API_BASE_URL: string = 'https://public-api.tracker.gg/v2/apex/standard/';
  APEX_API_KEY: string = '67667831-67a1-4e80-a3f3-28fb7cf936ea';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'TRN-Api-Key': this.APEX_API_KEY,
    }),
  };

  constructor(private http: HttpClient) {}

  searchPlayer(playerHandle: string, platform: string): Observable<any> {
    return this.http
      .get<any>(
        this.API_BASE_URL +
          'search?' +
          'platform=' +
          platform +
          '&query=' +
          playerHandle,
        this.httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  getPlayerData(playerHandle: string, platform: string): Observable<any> {
    return this.http
      .get<any>(
        this.API_BASE_URL + 'profile/' + platform + '/' + playerHandle,
        this.httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
}
