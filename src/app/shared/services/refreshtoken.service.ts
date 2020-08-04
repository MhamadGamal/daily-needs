import { map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IToken } from '../models/refreshtoken';

@Injectable({
    providedIn: 'root'
})
export class RefreshTokenService {
    private token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkdXJhdGlvbiI6IjEwMDAwMDAwIiwiY2xpZW50VGltZVN0YW1wIjoiMTIxMzQ1NjciLCJzZXJ2ZXJUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnpaWEoyWlhKVWFXMWxVM1JoYlhBaU9pSXhOVGt6TXpZeE5EWTBOVEl5SWl3aVkyeHBaVzUwVG5WdFltVnlJam9pYm01dWJtNXVJaXdpZFhObGNrNWhiV1VpT2lKdWJtNXVibTRpZlEuUndHQnVBVDVhMDNvaXYyNWJWSE1DbDhSZENsUVpveVh6MXN0ZFIzUFVTOCJ9.sKFIsoRlztQXBRtdm-kwTBGsaAwvbKpfi8Tkcw4dE1Q';
    get authToken() {
        return this.token;
    }
    set authToken(_token) {
        this.token = 'Bearer ' + _token;
        localStorage.setItem('authtoken', this.token)
    }
    constructor(private http: HttpClient) {
        if (localStorage.getItem('authtoken')) {
            this.token = localStorage.getItem('authtoken');
        }
    }
    getToken() {
        const time = new Date().getTime();

        const reqHeaders = new HttpHeaders({
            'token': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkdXJhdGlvbiI6IjEwMDAwMDAwIiwiY2xpZW50VGltZVN0YW1wIjoiMTIxMzQ1NjciLCJzZXJ2ZXJUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnpaWEoyWlhKVWFXMWxVM1JoYlhBaU9pSXhOVGt6TXpZeE5EWTBOVEl5SWl3aVkyeHBaVzUwVG5WdFltVnlJam9pYm01dWJtNXVJaXdpZFhObGNrNWhiV1VpT2lKdWJtNXVibTRpZlEuUndHQnVBVDVhMDNvaXYyNWJWSE1DbDhSZENsUVpveVh6MXN0ZFIzUFVTOCJ9.sKFIsoRlztQXBRtdm-kwTBGsaAwvbKpfi8Tkcw4dE1Q',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'clientTimeStamp': String(time)
        });

        return this.http.post('http://foodpage.dnsalias.com:8081/RestService/api/restService/refreshToken', {},
            { headers: reqHeaders }).pipe(
                map((res: IToken) => {
                    this.authToken = res.token;
                    return res;
                })
            );
    }
}