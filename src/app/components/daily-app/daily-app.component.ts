import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-daily-app',
  templateUrl: './daily-app.component.html',
  styleUrls: ['./daily-app.component.css']
})
export class DailyAppComponent implements OnInit {
  @Input() lang
  constructor() { }

  ngOnInit() {
  }

}
