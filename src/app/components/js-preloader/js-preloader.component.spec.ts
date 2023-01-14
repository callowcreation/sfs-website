import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsPreloaderComponent } from './js-preloader.component';

describe('JsPreloaderComponent', () => {
  let component: JsPreloaderComponent;
  let fixture: ComponentFixture<JsPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsPreloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
