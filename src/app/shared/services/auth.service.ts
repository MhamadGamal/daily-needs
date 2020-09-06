import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { IloginedUserData, UpdateClientInfoResponse } from '../models/logined-user-data';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn = false;
    private userData: IloginedUserData;
    set loginedUserData(data: IloginedUserData) {
        this.userData = data;
        this.isLoggedIn = true;
        this.updateData();

    }
    get loginedUserData() {
        return this.userData;
    }

    constructor(private router: Router, private cart: CartService) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.isLoggedIn = true;
        }
        if (localStorage.getItem('loginedUserData')) {
            this.loginedUserData = JSON.parse(localStorage.getItem('loginedUserData'));
        }
    }
    updateData() {
        localStorage.setItem('loginedUserData', JSON.stringify(this.userData));
        localStorage.setItem('isLoggedIn', 'true');
    }
    signout() {
        this.userData = null;
        this.isLoggedIn = false;
        this.cart.resetCart();
        localStorage.removeItem('loginedUserData');
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/home']);
    }
}
