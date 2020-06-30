import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-health-information',
  templateUrl: './health-information.component.html',
  styleUrls: ['./health-information.component.css']
})
export class HealthInformationComponent implements OnInit, OnDestroy {
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
