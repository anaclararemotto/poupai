import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBottom } from './services-bottom';

describe('ServicesBottom', () => {
  let component: ServicesBottom;
  let fixture: ComponentFixture<ServicesBottom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBottom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesBottom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
