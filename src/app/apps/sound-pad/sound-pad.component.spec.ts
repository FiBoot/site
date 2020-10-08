import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundPadComponent } from './sound-pad.component';

describe('SoundPadComponent', () => {
  let component: SoundPadComponent;
  let fixture: ComponentFixture<SoundPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
