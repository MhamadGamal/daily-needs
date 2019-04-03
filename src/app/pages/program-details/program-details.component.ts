import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {

  public pageName:string = "program details";
  public pageNameSub:string = "programs";
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
