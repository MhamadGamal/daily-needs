import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
      }));
  }

  ngOnInit() {
  }
  goTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
