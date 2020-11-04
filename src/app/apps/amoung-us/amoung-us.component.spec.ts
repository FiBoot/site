import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmoungUsComponent } from './amoung-us.component';

describe('AmoungUsComponent', () => {
  let component: AmoungUsComponent;
  let fixture: ComponentFixture<AmoungUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmoungUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmoungUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
