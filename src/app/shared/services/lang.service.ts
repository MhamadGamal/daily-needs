import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    lang = new BehaviorSubject('ar');
    constructor() {
        if (localStorage.getItem('language')) {
            this.changeLang(localStorage.getItem('language'));
        }
    }
    changeLang(newLang: string) {
        this.lang.next(newLang);
        localStorage.setItem('language', newLang);
    }
}
