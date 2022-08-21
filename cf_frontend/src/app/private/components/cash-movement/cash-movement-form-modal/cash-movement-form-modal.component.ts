import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {CashMovementService} from "../../../../core/services/cash-movement/cash-movement.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {BudgetService} from "../../../../core/services/budget/budget.service";

@Component({
  selector: 'app-cash-movement-form-modal',
  templateUrl: './cash-movement-form-modal.component.html',
  styleUrls: ['./cash-movement-form-modal.component.sass']
})
export class CashMovementFormModalComponent implements OnInit {
  cashMovementForm: FormGroup;
  closeResult = '';

  constructor(
    private builder: FormBuilder,
    public cashMovementService: CashMovementService,
    private modalService: NgbModal,
    public budgetService: BudgetService,
  ) { }

  ngOnInit(): void {
    this.cashMovementForm = new FormGroup<any>({
      association: new FormControl('', {
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

      dateToPay: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      budgetId: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      typeMovementId: new FormControl('', {
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
    if (this.cashMovementForm.valid){
      this.cashMovementService.addCashMovement(this.cashMovementForm.value);
    }
  }

}
