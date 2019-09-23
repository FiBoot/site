import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectsLogoComponent } from './architects-logo.component';

describe('ArchitectsLogoComponent', () => {
  let component: ArchitectsLogoComponent;
  let fixture: ComponentFixture<ArchitectsLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectsLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
