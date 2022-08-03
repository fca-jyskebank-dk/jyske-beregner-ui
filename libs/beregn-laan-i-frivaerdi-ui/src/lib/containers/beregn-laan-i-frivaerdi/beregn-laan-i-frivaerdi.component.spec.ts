/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeregnLaanIFrivaerdiComponent } from './beregn-laan-i-frivaerdi.component';

describe('BeregnLaanIFrivaerdiComponent', () => {
  let component: BeregnLaanIFrivaerdiComponent;
  let fixture: ComponentFixture<BeregnLaanIFrivaerdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeregnLaanIFrivaerdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeregnLaanIFrivaerdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
