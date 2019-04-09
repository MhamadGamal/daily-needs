import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritItemsComponent } from './favourit-items.component';

describe('FavouritItemsComponent', () => {
  let component: FavouritItemsComponent;
  let fixture: ComponentFixture<FavouritItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
