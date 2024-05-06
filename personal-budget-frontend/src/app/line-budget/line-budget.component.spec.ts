import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBudgetComponent } from './line-budget.component';

describe('LineBudgetComponent', () => {
  let component: LineBudgetComponent;
  let fixture: ComponentFixture<LineBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
