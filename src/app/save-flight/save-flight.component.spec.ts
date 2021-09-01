import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFlightComponent } from './save-flight.component';

describe('SaveFlightComponent', () => {
  let component: SaveFlightComponent;
  let fixture: ComponentFixture<SaveFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
