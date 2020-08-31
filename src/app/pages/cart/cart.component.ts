import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  lang: string;
  subscription: Subscription = new Subscription();
  environment = environment;
  constructor(private translate: TranslateService, private langS: LangService,
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
  }

  ngOnInit() {
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  gotoCheckout() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/cart/checkout']);
    } else {
      const loginTxt = this.lang === 'en' ? 'kindlly login or signup' : 'من فضلك قم بالتسجيل او تسجيل الدخول';
      this.notifierService.notify('success', loginTxt);
      document.querySelectorAll('[aria-labelledby="navbarDropdown"]')[1].classList.add('show');

    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
