import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaanGenerelTeaserComponent } from './laan-generel-teaser.component';

describe('LaanGenerelTeaserComponent', () => {
  let component: LaanGenerelTeaserComponent;
  let fixture: ComponentFixture<LaanGenerelTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaanGenerelTeaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaanGenerelTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
