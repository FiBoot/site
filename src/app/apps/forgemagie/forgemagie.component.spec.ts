import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgemagieComponent } from './forgemagie.component';

describe('ForgemagieComponent', () => {
  let component: ForgemagieComponent;
  let fixture: ComponentFixture<ForgemagieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgemagieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgemagieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
