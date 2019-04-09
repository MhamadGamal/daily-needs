import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-favourit-healthinfo',
  templateUrl: './favourit-healthinfo.component.html',
  styleUrls: ['./favourit-healthinfo.component.css']
})
export class FavouritHealthinfoComponent implements OnInit {
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
