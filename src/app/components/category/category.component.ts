import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public lang : string = environment.lang;
  constructor() {
    console.log(this.lang);
  }

  ngOnInit() {
  }

}
