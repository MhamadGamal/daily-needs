import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public pageName:string = "cart";
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
