import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';
import { LangService } from 'src/app/shared/services/lang.service';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.css']
})
export class HealthDetailsComponent implements OnInit, OnDestroy {
  id: string;
  subscription: Subscription = new Subscription();
  healthInfo: IHealthInfo[];
  targetHealthInfo: IHealthInfo;
  language: string;
  constructor(private translate: TranslateService,
    private langS: LangService, private healthInfoService: HealthInfoService, private params: ActivatedRoute) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
    this.id = this.params.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getHealthInfo();
  }
  getHealthInfo() {
    this.healthInfoService.getHealthInfo().subscribe((data: IHealthInfo[]) => {
      this.healthInfo = data;
      this.targetHealthInfo = data.filter((item: IHealthInfo) => item.id === this.id)[0];
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
