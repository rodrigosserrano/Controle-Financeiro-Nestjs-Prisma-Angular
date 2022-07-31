import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { BudgetCardComponent } from './budget/budget-card/budget-card.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { BudgetFormComponent } from './budget/budget-form/budget-form.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    BudgetCardComponent,
    BudgetListComponent,
    BudgetFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
