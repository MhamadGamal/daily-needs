import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {



  public form: FormGroup;

  language: string;
  subscription: Subscription = new Subscription();
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    private api: ApiInterceptorService,
    public authService: AuthService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }


  editForm() {
    this.form.get('firstName').enable();
    this.form.get('lastName').enable();
    this.form.get('email').enable();
    this.form.get('phone').enable();
    this.form.get('address').enable();
  }

  saveForm() {
    console.log('save');
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    this.form.get('email').disable();
    this.form.get('phone').disable();
    this.form.get('address').disable();
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.firstName
        , disabled: true
      }, [Validators.required]),
      lastName: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.lastName
        , disabled: true
      }, [Validators.required]),
      email: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.email
        , disabled: true
      }, [Validators.required]),
      phone: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.mobileNumber
        , disabled: true
      }, [Validators.required]),
      address: new FormControl({ value: ['Address one', 'Address two'], disabled: true }, [Validators.required]),
    });
  }

}
