import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaanGenerelProdukterComponent } from './laan-generel-produkter.component';

describe('LaanGenerelProdukterComponent', () => {
  let component: LaanGenerelProdukterComponent;
  let fixture: ComponentFixture<LaanGenerelProdukterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaanGenerelProdukterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaanGenerelProdukterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
