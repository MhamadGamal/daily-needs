import { ApiInterceptorService } from './../../shared/interceptor/api-interceptor.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { IMenu } from 'src/app/shared/models/menu';

@Component({
  selector: 'app-daily-need-products',
  templateUrl: './daily-need-products.component.html',
  styleUrls: ['./daily-need-products.component.css']
})
export class DailyNeedProductsComponent implements OnInit, OnDestroy {
  menu: IMenu;
  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService,
    private api: ApiInterceptorService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
  }

  ngOnInit() {
    this.getMenu();
  }
  getMenu() {
    const reqBody = {
      'serviceName': 'WSIOrderActivities',
      'restaurantsItemsList': {
        'areaID': '115',
        'branchId': '4967',
        'institutionNumber': '00000002',
        'processCode': '144200',
        'resturantID': '4967',
        'sourceID': '702000110001',
        'additionalData': [
          {
            'lang': 'EN'
          }
        ],
        'channelInfo': {
          'acquirerCountry': '818',
          'merchantName': 'android|9|6953f5e7-80f1-49ea-a2f0-24e765284660|1.0.17'
        }
      }
    };
    this.api.call('POST', reqBody).then((res: Observable<IMenu>) => {
      this.subscription.add(
        res.subscribe((menu: IMenu) => {
          console.log(menu);
          this.menu = menu;
        })
      )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
