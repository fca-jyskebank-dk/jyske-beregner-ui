import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBeregningComponent } from './send-beregning.component';

describe('ModtagBeregningComponent', () => {
  let component: SendBeregningComponent;
  let fixture: ComponentFixture<SendBeregningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendBeregningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBeregningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
