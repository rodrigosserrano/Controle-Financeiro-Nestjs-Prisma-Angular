import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { BudgetCardComponent } from './budget/budget-card/budget-card.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { BudgetFormModalComponent } from './budget/budget-form-modal/budget-form-modal.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgbDateParserFormatter, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

import {
  CashMovementFormModalComponent
} from "./cash-movement/cash-movement-form-modal/cash-movement-form-modal.component";

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,

    BudgetCardComponent,
    BudgetListComponent,

    BudgetFormModalComponent,
    CashMovementFormModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  providers: [FormBuilder,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
