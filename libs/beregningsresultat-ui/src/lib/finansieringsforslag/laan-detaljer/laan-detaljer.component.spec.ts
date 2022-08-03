/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LaanDetaljerComponent } from './laan-detaljer.component';

describe('JyskeRealkreditlaanDetaljerComponent', () => {
  let component: LaanDetaljerComponent;
  let fixture: ComponentFixture<LaanDetaljerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LaanDetaljerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaanDetaljerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
