import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { IMenu, ICategoriesInfo } from 'src/app/shared/models/menu';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  language: string;
  subscription: Subscription = new Subscription();
  menu: IMenu;
  filteredItems: ICategoriesInfo[];
  search: string;
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    public authService: AuthService,
    private menuItemsService: MenuItemsService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
  }

  getMenu() {
    this.menuItemsService.getMenu().then((res: Observable<IMenu>) => {
      this.subscription.add(
        res
          .subscribe((menu: IMenu) => {
            this.menu = menu;
            this.menuItemsService.menu = menu;
          })
      );
    });
  }
}
