import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseTestComponent } from './noise-test.component';

describe('AmplitudeComponent', () => {
  let component: NoiseTestComponent;
  let fixture: ComponentFixture<NoiseTestComponent>;

  beforeEach(waitForAsync()) => {
    TestBed.configureTestingModule({
      declarations: [ NoiseTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
