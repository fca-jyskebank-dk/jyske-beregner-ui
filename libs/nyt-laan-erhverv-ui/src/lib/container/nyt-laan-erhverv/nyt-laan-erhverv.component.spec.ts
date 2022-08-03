/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NytLaanErhvervComponent } from './nyt-laan-erhverv.component';

describe('NytLaanErhvervComponent', () => {
  let component: NytLaanErhvervComponent;
  let fixture: ComponentFixture<NytLaanErhvervComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NytLaanErhvervComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NytLaanErhvervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
