import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';
import { LangService } from 'src/app/shared/services/lang.service';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit, OnDestroy {
  language: string;
  subscription: Subscription = new Subscription();
  healthInfo: IHealthInfo[];
  constructor(private translate: TranslateService, private langS: LangService, private healthInfoService: HealthInfoService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.healthInfo = this.healthInfoService.healthInfo;
    if (!this.healthInfo) {
      this.getHealthInfo();
    }
  }
  getHealthInfo() {
    this.healthInfoService.getHealthInfo().subscribe((data: IHealthInfo[]) => {
      this.healthInfo = data;
      this.healthInfoService.healthInfo = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
