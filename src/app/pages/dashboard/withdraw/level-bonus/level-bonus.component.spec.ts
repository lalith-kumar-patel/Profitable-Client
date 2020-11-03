import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBonusComponent } from './level-bonus.component';

describe('LevelBonusComponent', () => {
  let component: LevelBonusComponent;
  let fixture: ComponentFixture<LevelBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
