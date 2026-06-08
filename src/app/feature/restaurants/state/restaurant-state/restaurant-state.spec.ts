import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantState } from './restaurant-state';

describe('RestaurantState', () => {
  let component: RestaurantState;
  let fixture: ComponentFixture<RestaurantState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantState],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
