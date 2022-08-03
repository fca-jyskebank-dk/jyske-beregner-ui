/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JyskeFrihedComponent } from './jyske-frihed.component';

describe('JyskeFrihedComponent', () => {
  let component: JyskeFrihedComponent;
  let fixture: ComponentFixture<JyskeFrihedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JyskeFrihedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JyskeFrihedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
