import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../../core/services/authorization/authorization.service";
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
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    // if (this.authService.getLoginStatus()) {
    //   this.router.navigate(['/home']).then();
    // }
    this.loginForm = new FormGroup<any>({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        nonNullable: true,
      }),

      password: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      })
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.authorize(this.loginForm.value)
        .subscribe((data: any) => {
            if (data) {
              this.router.navigate(['/home']).then();
            }
            // this.toastrService.success('Logado com sucesso !', 'Sucesso')
            // this.authService.setTokenUser(data.access_token)
            // window.location.reload();
          }
        )
    }
  }
}
