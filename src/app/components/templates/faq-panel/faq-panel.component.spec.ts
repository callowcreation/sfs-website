import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQPanel } from './faq-panel.component';

describe('FAQPanel', () => {
  let component: FAQPanel;
  let fixture: ComponentFixture<FAQPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQPanel ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
