import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
      }));
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
