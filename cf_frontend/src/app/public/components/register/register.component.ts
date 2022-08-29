import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../core/services/authorization/authorization.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../core/validators/custom-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly authService: AuthorizationService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [null, Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/\W|_/, { hasSpecialCharacters: true }),
        Validators.minLength(8)])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      grossIncome: [null, Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      ])],
    },
      {
      validator: CustomValidators.passwordMatchValidator
      })
  }

  onSubmit() {
    console.log(this.registerForm)
  }
}
