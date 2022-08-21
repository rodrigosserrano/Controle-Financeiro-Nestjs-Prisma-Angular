import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {BudgetService} from "../../../../core/services/budget/budget.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-budget-form-modal',
  templateUrl: './budget-form-modal.component.html',
  styleUrls: ['./budget-form-modal.component.sass']
})
export class BudgetFormModalComponent implements OnInit {

  budgetForm: FormGroup;
  closeResult = '';

  constructor(
    private builder: FormBuilder,
    private budgetService: BudgetService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.budgetForm = new FormGroup<any>({
      name: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      description: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      cash: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Close with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.budgetForm.valid){
      this.budgetService.addBudget(this.budgetForm.value);
    }
  }

}
