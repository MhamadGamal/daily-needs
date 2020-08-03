import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IOrderInfo } from 'src/app/shared/models/order';

@Component({
  selector: 'app-myorders-content',
  templateUrl: './myorders-content.component.html',
  styleUrls: ['./myorders-content.component.css']
})
export class MyordersContentComponent implements OnInit {
  @Input() Orders: Array<IOrderInfo>;
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
