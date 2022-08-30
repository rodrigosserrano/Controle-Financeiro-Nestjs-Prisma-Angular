import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../shared/services/authorization/authorization.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../shared/validators/custom-validators";
import {HttpStatusCode} from "@angular/common/http";

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
    if (this.registerForm.valid) {
      this.authService.signIn(this.registerForm.value)
        .then((res: any) => {
          console.log(res)
          if (res.message) {
            this.toastrService.error(res?.message, 'Erro');
          } else {
            this.toastrService.success('Registrado com sucesso !', 'Successo');
            this.router.navigate(['/login']).then();
          }
        });
    }
  }
}
