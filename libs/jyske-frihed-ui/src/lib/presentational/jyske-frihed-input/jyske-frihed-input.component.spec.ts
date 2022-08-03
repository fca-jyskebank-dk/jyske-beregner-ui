/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JyskeFrihedInputComponent } from './jyske-frihed-input.component';

describe('JyskeFrihedInputComponent', () => {
  let component: JyskeFrihedInputComponent;
  let fixture: ComponentFixture<JyskeFrihedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JyskeFrihedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JyskeFrihedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
