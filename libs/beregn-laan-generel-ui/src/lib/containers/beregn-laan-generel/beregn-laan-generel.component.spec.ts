import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeregnLaanGenerelComponent } from './beregn-laan-generel.component';

describe('BeregnLaanGenerelComponent', () => {
  let component: BeregnLaanGenerelComponent;
  let fixture: ComponentFixture<BeregnLaanGenerelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeregnLaanGenerelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeregnLaanGenerelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
