import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';

@Component({
  selector: 'app-health-information',
  templateUrl: './health-information.component.html',
  styleUrls: ['./health-information.component.css']
})
export class HealthInformationComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  healthInfo: IHealthInfo[];
  constructor(private translate: TranslateService, private langS: LangService, private healthInfoService: HealthInfoService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
      }));
  }

  ngOnInit() {
    this.getHealthInfo();
  }
  getHealthInfo() {
    this.healthInfoService.getHealthInfo().subscribe((data: IHealthInfo[]) => {
      this.healthInfo = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
