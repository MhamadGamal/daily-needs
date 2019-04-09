import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritsComponent } from './favourits.component';

describe('FavouritsComponent', () => {
  let component: FavouritsComponent;
  let fixture: ComponentFixture<FavouritsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
