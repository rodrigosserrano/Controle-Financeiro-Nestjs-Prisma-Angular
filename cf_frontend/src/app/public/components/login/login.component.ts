import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../../shared/services/authorization/authorization.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {catchError, firstValueFrom} from "rxjs";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private readonly authService: AuthorizationService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.authService.userProfile.getValue() != null) this.router.navigate(['/home']).then();

    this.loginForm = this.createLogInForm();
  }

  createLogInForm(): FormGroup {
    return this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],

      password: [null, Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value)
        .subscribe((data: any) => {
            if (data) {
              this.router.navigate(['/home']).then();
            }
          }
        )
    }
  }
}
