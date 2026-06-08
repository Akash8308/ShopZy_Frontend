import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantServices } from './restaurant-services';

describe('RestaurantServices', () => {
  let component: RestaurantServices;
  let fixture: ComponentFixture<RestaurantServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantServices],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
