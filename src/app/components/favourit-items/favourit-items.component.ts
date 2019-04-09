import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-favourit-items',
  templateUrl: './favourit-items.component.html',
  styleUrls: ['./favourit-items.component.css']
})
export class FavouritItemsComponent implements OnInit {
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
