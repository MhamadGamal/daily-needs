import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-privacy',
  templateUrl: './payment-privacy.component.html',
  styleUrls: ['./payment-privacy.component.css']
})
export class PaymentPrivacyComponent implements OnInit {

  public pageName:string = "privacy";
  public lang:string = environment.lang;
  public isLogged:boolean = false;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.lang); 
    let token = localStorage.getItem('token');
    if(token){
        this.isLogged = true ;
    }
  }

  ngOnInit() {
  }

}
