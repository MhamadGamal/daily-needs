import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAppComponent } from './daily-app.component';

describe('DailyAppComponent', () => {
  let component: DailyAppComponent;
  let fixture: ComponentFixture<DailyAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
