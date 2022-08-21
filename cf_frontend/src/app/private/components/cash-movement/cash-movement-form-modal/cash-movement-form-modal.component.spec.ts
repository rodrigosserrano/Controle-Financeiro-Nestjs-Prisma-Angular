import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFormModalComponent } from './budget-form.component';

describe('BudgetFormComponent', () => {
  let component: BudgetFormModalComponent;
  let fixture: ComponentFixture<BudgetFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFormModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
