import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelampagoComponent } from './relampago.component';

describe('RelampagoComponent', () => {
  let component: RelampagoComponent;
  let fixture: ComponentFixture<RelampagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelampagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelampagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
