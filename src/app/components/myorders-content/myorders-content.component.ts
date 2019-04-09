import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-myorders-content',
  templateUrl: './myorders-content.component.html',
  styleUrls: ['./myorders-content.component.css']
})
export class MyordersContentComponent implements OnInit {
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
