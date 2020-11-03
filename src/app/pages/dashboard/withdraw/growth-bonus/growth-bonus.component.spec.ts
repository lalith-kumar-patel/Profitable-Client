import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthBonusComponent } from './growth-bonus.component';

describe('GrowthBonusComponent', () => {
  let component: GrowthBonusComponent;
  let fixture: ComponentFixture<GrowthBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
