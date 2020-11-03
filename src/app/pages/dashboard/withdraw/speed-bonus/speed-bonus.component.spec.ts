import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedBonusComponent } from './speed-bonus.component';

describe('SpeedBonusComponent', () => {
  let component: SpeedBonusComponent;
  let fixture: ComponentFixture<SpeedBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
