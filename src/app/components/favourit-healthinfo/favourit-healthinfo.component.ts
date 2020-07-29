import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';

@Component({
  selector: 'app-favourit-healthinfo',
  templateUrl: './favourit-healthinfo.component.html',
  styleUrls: ['./favourit-healthinfo.component.css']
})
export class FavouritHealthinfoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isItemsLoaded: boolean;
  healthInfo: IHealthInfo[];
  favHealthInfo: IHealthInfo[];
  language: string;
  constructor(private translate: TranslateService, private langS: LangService, private healthInfoService: HealthInfoService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.healthInfo = this.healthInfoService.healthInfo;
    if (this.healthInfo) {
      this.favHealthInfo = this.healthInfo.filter((item: IHealthInfo) => item.isFav === true);
      this.isItemsLoaded = true;
    } else {
      this.getHealthInfo();
    }
  }
  getHealthInfo() {
    this.healthInfoService.getHealthInfo().subscribe((data: IHealthInfo[]) => {
      this.healthInfo = data;
      this.healthInfoService.healthInfo = data;
      this.favHealthInfo = this.healthInfo.filter((item: IHealthInfo) => item.isFav === true);
      this.isItemsLoaded = true;
    });
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
