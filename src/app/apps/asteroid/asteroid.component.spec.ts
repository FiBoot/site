import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidComponent } from './asteroid.component';

describe('AsteroidComponent', () => {
  let component: AsteroidComponent;
  let fixture: ComponentFixture<AsteroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsteroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsteroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
