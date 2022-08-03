/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JyskeFrihedProdukterComponent } from './jyske-frihed-produkter.component';

describe('JyskeFrihedProdukterComponent', () => {
  let component: JyskeFrihedProdukterComponent;
  let fixture: ComponentFixture<JyskeFrihedProdukterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JyskeFrihedProdukterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JyskeFrihedProdukterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
