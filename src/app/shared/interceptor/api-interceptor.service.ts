import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RefreshTokenService } from '../services/refreshtoken.service';
import { IToken } from '../models/refreshtoken';
import { map, retry, retryWhen, delay, scan } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {
  tokenres: IToken;
  constructor(private http: HttpClient, private tokenService: RefreshTokenService) { }
  // call(method: string, body?) {
  //   this.tokenService.getToken().subscribe((res: any) => {
  //     this.tokenService.authToken = res.token;
  //   });
  //   const time = new Date().getTime();
  //   const reqHeaders = new HttpHeaders({
  //     'token': this.tokenService.authToken,
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'clientTimeStamp': String(time)
  //   });
  //   const baseUrl = `http://foodpage.dnsalias.com:8081/RestService/api/restService/`;

  //   if (method === 'GET') {
  //     return this.http.get(baseUrl, { headers: reqHeaders });
  //   } else if (method === 'POST') {
  //     return this.http.post(baseUrl, body, { headers: reqHeaders });
  //   }
  // }
  call(method: string, body?) {
    const time = new Date().getTime();
    const reqHeaders = new HttpHeaders({
      'token': this.tokenService.authToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'clientTimeStamp': String(time)
    });
    const baseUrl = `http://foodpage.dnsalias.com:8081/RestService/api/restService/`;
    if (method === 'GET') {
      return this.http.get(baseUrl, { headers: reqHeaders });
    } else if (method === 'POST') {
      return this.http.post(baseUrl, body, { headers: reqHeaders }).pipe(
        map((res: any) => {
          if (res.error) {
            this.tokenService.getToken().subscribe(res => {
              this.call(method, body);
            });
          }
          return res;
        }));
    }
  }
}
