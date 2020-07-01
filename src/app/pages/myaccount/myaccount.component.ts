import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  language: string;
  subscription: Subscription = new Subscription();
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    public authService: AuthService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
  }

}
