import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelPageComponent } from './hostel-page.component';

describe('HostelPageComponent', () => {
  let component: HostelPageComponent;
  let fixture: ComponentFixture<HostelPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostelPageComponent]
    });
    fixture = TestBed.createComponent(HostelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
