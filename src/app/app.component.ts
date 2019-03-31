import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

const arr = window.location.pathname.split('/');
export function getStyle(){
  return arr[1] === 'ar' ? ['../assets/css/ar/ar-style.css'] : ['../assets/css/en/en-style.css'];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: getStyle(),
})
export class AppComponent {
  title = 'dailyneeds';
  constructor(private translate: TranslateService) {
    environment.lang = arr[1];
    translate.setDefaultLang(arr[1]);
}
}
