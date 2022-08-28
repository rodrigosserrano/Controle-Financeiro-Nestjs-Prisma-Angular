import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import {AppComponent} from './app.component';
import {PrivateComponent} from './private/private.component';
import {BudgetCardComponent} from './private/components/budget/budget-card/budget-card.component';
import {BudgetListComponent} from './private/components/budget/budget-list/budget-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import {BudgetFormModalComponent} from './private/components/budget/budget-form-modal/budget-form-modal.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

import {
  CashMovementFormModalComponent
} from "./private/components/cash-movement/cash-movement-form-modal/cash-movement-form-modal.component";
import {IndicatorsComponent} from './private/components/indicators/indicators.component';
import {RegisterComponent} from './public/components/register/register.component';
import {LoginComponent} from './public/components/login/login.component';
import {PublicComponent} from './public/public.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ValidateTokenInterceptor} from "./validate-token.interceptor";
import {AuthorizationService} from "./core/services/authorization/authorization.service";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";

registerLocaleData(localePt, 'pt');

export function jwtOptionFactor(authService: AuthorizationService){
  return {
    tokenGetter:() => {
      return authService.getAccessToken();
    },
    allowedDomains:["localhost:3000"],
    disallowedRoutes:[
      "http://localhost:3000/login"
    ]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,

    BudgetCardComponent,
    BudgetListComponent,

    BudgetFormModalComponent,
    CashMovementFormModalComponent,
    IndicatorsComponent,
    RegisterComponent,
    LoginComponent,
    PublicComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide: JWT_OPTIONS,
        useFactory: jwtOptionFactor,
        deps: [AuthorizationService]
      }
    })
  ],
  providers: [FormBuilder,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidateTokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
