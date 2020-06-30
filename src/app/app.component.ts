import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LangService } from './shared/services/lang.service';
import { RefreshTokenService } from './shared/services/refreshtoken.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService, private langS: LangService, private tokenService: RefreshTokenService) {
    this.tokenService.getToken().subscribe((res: any) => {
      this.tokenService.authToken = res.token;
    });
  }
  ngOnInit() {
    this.langS.lang.subscribe(lang => {
      if (lang === 'ar') {
        document.body.setAttribute('lang', 'ar');
      } else {
        document.body.setAttribute('lang', 'en');

      }
    });
  }
}
