import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  public pageName:string = "programs";
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
