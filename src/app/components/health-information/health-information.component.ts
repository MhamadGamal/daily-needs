import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-health-information',
  templateUrl: './health-information.component.html',
  styleUrls: ['./health-information.component.css']
})
export class HealthInformationComponent implements OnInit {
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
