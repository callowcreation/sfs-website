import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyViewComponent } from './legacy-view.component';

describe('LegacyViewComponent', () => {
  let component: LegacyViewComponent;
  let fixture: ComponentFixture<LegacyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
