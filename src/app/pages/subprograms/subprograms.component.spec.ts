import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprogramsComponent } from './subprograms.component';

describe('SubprogramsComponent', () => {
  let component: SubprogramsComponent;
  let fixture: ComponentFixture<SubprogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
