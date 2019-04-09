import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

declare var $:any;
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  public pageName:string = "myaccount";
  // public pageNameSub:string = "health";
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


  setActive(elementID){
    console.log(elementID);
    $('.link').forEach(element => {
      $(this).removeClass('link-active');
    });
    $('#'+elementID).addClass('link-active');
  }
}
