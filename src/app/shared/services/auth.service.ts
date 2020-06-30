import { Injectable } from '@angular/core';
import { IloginedUserData } from '../models/logined-user-data';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn = false;
    private userData: IloginedUserData;

    set loginedUserData(data: IloginedUserData) {
        this.userData = data;
        this.isLoggedIn = true;
        localStorage.setItem('loginedUserData', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', 'true');

    }
    get loginedUserData() {
        return this.userData;
    }

    constructor() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.isLoggedIn = true;
        }
        if (localStorage.getItem('loginedUserData')) {
            this.loginedUserData = JSON.parse(localStorage.getItem('loginedUserData'));
        }
    }
    signout() {
        this.userData = null;
        this.isLoggedIn = false;
        localStorage.removeItem('loginedUserData');
        localStorage.removeItem('isLoggedIn');
    }
}
