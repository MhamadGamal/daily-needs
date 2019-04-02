import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-need-products',
  templateUrl: './daily-need-products.component.html',
  styleUrls: ['./daily-need-products.component.css']
})
export class DailyNeedProductsComponent implements OnInit {

  @Input() lang;
  
  constructor() { }

  ngOnInit() {
  }

}
